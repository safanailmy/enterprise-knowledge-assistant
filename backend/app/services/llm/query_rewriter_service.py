from app.schemas.prompt_request import (
    ConversationHistoryItem
)

from app.services.llm.llm_service import (
    llm_service
)


class QueryRewriterService:

    def rewrite(
        self,
        question: str,
        conversation_history: list[
            ConversationHistoryItem
        ]
    ) -> str:

        if not conversation_history:

            return question

        history_text = ""

        for message in conversation_history:

            history_text += (

                f"{message.role.upper()}:\n"
                f"{message.content}\n\n"

            )

        prompt = f"""
You are a query rewriting assistant for a
Retrieval-Augmented Generation system.

Your task is to rewrite the current user question
into a clear, standalone search query.

Use the conversation history only to resolve
references such as:

- it
- that
- this
- they
- the policy
- the leave
- the document
- the previous answer

Do not answer the question.

Do not add facts that are not present in the
conversation.

Do not explain your reasoning.

Return only the rewritten standalone query.

If the current question is already standalone,
return it unchanged.

----------------------------------------

Conversation History:

{history_text}

----------------------------------------

Current Question:

{question}

----------------------------------------

Standalone Query:
"""

        response = llm_service.generate(
            prompt
        )

        if not response.success:

            return question

        rewritten_query = (
            response.answer.strip()
        )

        if not rewritten_query:

            return question

        return rewritten_query


query_rewriter_service = (
    QueryRewriterService()
)