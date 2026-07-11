from datetime import datetime

from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.settings import settings

from app.enums.user_role import UserRole

from app.enums.audit_action import (
    AuditAction
)

from app.models.user import User

from app.models.message import Message

from app.schemas.chat_request import (
    ChatRequest
)

from app.schemas.chat_response import (
    ChatResponse
)

from app.schemas.search_request import (
    SearchRequest
)

from app.repositories.document_repository import (
    document_repository
)

from app.repositories.conversation_repository import (
    conversation_repository
)

from app.repositories.message_repository import (
    message_repository
)

from app.services.rag.embedding_service import (
    embedding_service
)

from app.services.rag.chroma_service import (
    chroma_service
)

from app.services.llm.prompt_service import (
    prompt_service
)

from app.services.llm.llm_service import (
    llm_service
)

from app.services.audit.audit_service import (
    audit_service
)


from app.schemas.prompt_request import (
    PromptRequest,
    ConversationHistoryItem
)


from app.services.llm.query_rewriter_service import (
    query_rewriter_service
)

class ChatService:

    def chat(
        self,
        chat_request: ChatRequest,
        current_user: User,
        db: Session
    ) -> ChatResponse:

        conversation = (
            conversation_repository
            .get_by_id_and_user(
                db=db,
                conversation_id=chat_request.conversation_id,
                user_id=current_user.user_id
            )
        )

        if conversation is None:
            raise HTTPException(
                status_code=404,
                detail="Conversation not found."
            )

        if current_user.role == UserRole.ADMIN.value:
            authorized_department = chat_request.department
        else:
            authorized_department = current_user.department

        recent_messages = (
            message_repository
            .get_recent_by_conversation(
                db=db,
                conversation_id=conversation.conversation_id,
                limit=settings.CHAT_HISTORY_MESSAGE_LIMIT
            )
        )

        conversation_history = [
            ConversationHistoryItem(
                role=message.role,
                content=message.content
            )
            for message in recent_messages
        ]

        standalone_query = (
            query_rewriter_service.rewrite(
                question=chat_request.question,
                conversation_history=conversation_history
            )
        )

        user_message = Message(
            conversation_id=conversation.conversation_id,
            role="user",
            content=chat_request.question,
            sources=None
        )

        message_repository.save(
            db=db,
            message=user_message
        )

        try:
            question_embedding = (
                embedding_service.embed_query(
                    standalone_query
                )
            )

            search_request = SearchRequest(
                embedding=question_embedding,
                top_k=(
                    settings.TOP_K_RESULTS
                    * settings.RETRIEVAL_CANDIDATE_MULTIPLIER
                ),
                department=authorized_department,
                uploaded_by=chat_request.uploaded_by,
                version=chat_request.version,
                status=chat_request.status
            )

            retrieved_chunks = (
                chroma_service.search(
                    search_request
                )
            )

            document_ids = list({
                chunk.metadata.document_id
                for chunk in retrieved_chunks
            })

            active_ready_ids = (
                document_repository
                .get_active_ready_latest_ids(
                    db,
                    document_ids
                )
            )

            retrieved_chunks = [
                chunk
                for chunk in retrieved_chunks
                if (
                    chunk.metadata.document_id
                    in active_ready_ids
                )
            ]

            # Remove duplicate chunks
            unique_chunks = []
            seen_chunks = set()

            for chunk in retrieved_chunks:
                chunk_key = (
                    chunk.metadata.document_id,
                    chunk.chunk_index
                )

                if chunk_key in seen_chunks:
                    continue

                seen_chunks.add(chunk_key)
                unique_chunks.append(chunk)

            retrieved_chunks = (
                unique_chunks[
                    :settings.TOP_K_RESULTS
                ]
            )

            prompt_request = PromptRequest(
                question=chat_request.question,
                conversation_history=conversation_history,
                retrieved_chunks=retrieved_chunks
            )

            prompt = (
                prompt_service.build_prompt(
                    prompt_request
                )
            )

            llm_response = (
                llm_service.generate(
                    prompt
                )
            )

            if not llm_response.success:
                raise RuntimeError(
                    "LLM generation failed."
                )
            
            #forced failure
            #raise RuntimeError(
            #    "TEST: Forced chat failure."
            #)

            sources = [
                {
                    "document_id": (
                        chunk.metadata.document_id
                    ),
                    "filename": (
                        chunk.metadata.filename
                    ),
                    "version": (
                        chunk.metadata.version
                    ),

                    "page_number": (
                        chunk.page_number
                    ),

                    "chunk_index": (
                        chunk.chunk_index
                    )
                }
                for chunk in retrieved_chunks
            ]

            assistant_message = Message(
                conversation_id=conversation.conversation_id,
                role="assistant",
                content=llm_response.answer,
                sources=sources
            )

            message_repository.save(
                db=db,
                message=assistant_message
            )

            conversation.updated_at = (
                datetime.utcnow()
            )

            conversation_repository.update(
                db=db,
                conversation=conversation
            )

            audit_service.log(
                db=db,
                current_user=current_user,
                action=AuditAction.CHAT_QUERY.value,
                resource_type="CHAT",
                resource_id=conversation.conversation_id,
                details={
                    "question": chat_request.question,
                    "standalone_query": standalone_query,
                    "authorized_department": authorized_department,
                    "retrieved_chunk_count": len(retrieved_chunks),
                    "sources": sources
                }
            )

            return ChatResponse(
                conversation_id=conversation.conversation_id,
                answer=llm_response.answer,
                sources=sources
            )

        except Exception as error:
            try:
                message_repository.delete(
                    db=db,
                    message=user_message
                )
            except Exception:
                pass

            raise HTTPException(
                status_code=503,
                detail=(
                    "The chat service is temporarily "
                    "unavailable. Please try again."
                )
            ) from error


chat_service = ChatService()