from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.models.conversation import (
    Conversation
)

from app.models.user import User

from app.repositories.conversation_repository import (
    conversation_repository
)

from app.repositories.message_repository import (
    message_repository
)

from app.schemas.conversation_request import (
    CreateConversationRequest,
    UpdateConversationRequest
)

from app.schemas.responses.conversation_response import (
    ConversationItem,
    ConversationListResponse,
    MessageItem,
    ConversationDetailResponse
)


class ConversationService:

    def create_conversation(
        self,
        db: Session,
        current_user: User,
        request: CreateConversationRequest
    ) -> ConversationItem:

        title = (
            request.title.strip()
            if request.title
            else "New Conversation"
        )

        if not title:

            title = "New Conversation"

        conversation = Conversation(

            user_id=current_user.user_id,

            title=title

        )

        conversation_repository.save(

            db=db,

            conversation=conversation

        )

        return self._build_conversation_item(
            conversation
        )

    def get_my_conversations(
        self,
        db: Session,
        current_user: User
    ) -> ConversationListResponse:

        conversations = (
            conversation_repository
            .get_all_by_user(

                db=db,

                user_id=current_user.user_id

            )
        )

        items = [

            self._build_conversation_item(
                conversation
            )

            for conversation in conversations

        ]

        return ConversationListResponse(

            conversations=items

        )

    def get_conversation(
        self,
        db: Session,
        conversation_id: str,
        current_user: User
    ) -> ConversationDetailResponse:

        conversation = (
            self._get_owned_conversation(

                db=db,

                conversation_id=conversation_id,

                current_user=current_user

            )
        )

        messages = (
            message_repository
            .get_all_by_conversation(

                db=db,

                conversation_id=conversation_id

            )
        )

        message_items = [

            MessageItem(

                message_id=message.message_id,

                role=message.role,

                content=message.content,

                sources=message.sources,

                created_at=message.created_at

            )

            for message in messages

        ]

        return ConversationDetailResponse(

            conversation_id=(
                conversation.conversation_id
            ),

            title=conversation.title,

            created_at=conversation.created_at,

            updated_at=conversation.updated_at,

            messages=message_items

        )

    def rename_conversation(
        self,
        db: Session,
        conversation_id: str,
        current_user: User,
        request: UpdateConversationRequest
    ) -> ConversationItem:

        conversation = (
            self._get_owned_conversation(

                db=db,

                conversation_id=conversation_id,

                current_user=current_user

            )
        )

        title = request.title.strip()

        if not title:

            raise HTTPException(

                status_code=400,

                detail=(
                    "Conversation title "
                    "cannot be empty."
                )

            )

        conversation.title = title

        conversation_repository.update(

            db=db,

            conversation=conversation

        )

        return self._build_conversation_item(
            conversation
        )

    def delete_conversation(
        self,
        db: Session,
        conversation_id: str,
        current_user: User
    ) -> None:

        conversation = (
            self._get_owned_conversation(

                db=db,

                conversation_id=conversation_id,

                current_user=current_user

            )
        )

        conversation_repository.delete(

            db=db,

            conversation=conversation

        )

    def _get_owned_conversation(
        self,
        db: Session,
        conversation_id: str,
        current_user: User
    ) -> Conversation:

        conversation = (
            conversation_repository
            .get_by_id_and_user(

                db=db,

                conversation_id=conversation_id,

                user_id=current_user.user_id

            )
        )

        if conversation is None:

            raise HTTPException(

                status_code=404,

                detail="Conversation not found."

            )

        return conversation

    def _build_conversation_item(
        self,
        conversation: Conversation
    ) -> ConversationItem:

        return ConversationItem(

            conversation_id=(
                conversation.conversation_id
            ),

            title=conversation.title,

            created_at=conversation.created_at,

            updated_at=conversation.updated_at

        )


conversation_service = ConversationService()