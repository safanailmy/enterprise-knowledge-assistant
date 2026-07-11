from app.schemas.prompt_request import (
    PromptRequest
)


class PromptService:

    def build_prompt(
        self,
        prompt_request: PromptRequest
    ) -> str:

        prompt = """
You are an Enterprise Knowledge Assistant.

Answer the user's current question ONLY using
the provided document context.

Use the conversation history only to understand
references and follow-up questions such as:

- "it"
- "that"
- "this policy"
- "how long is it?"
- "what about employees?"
- "can you explain more?"

The conversation history is NOT an authoritative
knowledge source.

All factual claims in the answer must come from
the provided document context.

If the answer is not found in the provided
document context, reply exactly:

"I couldn't find that information in the uploaded documents."

Do not use your own knowledge.

----------------------------------------

Conversation History

"""

        if (
            prompt_request
            .conversation_history
        ):

            for message in (
                prompt_request
                .conversation_history
            ):

                prompt += f"""
{message.role.upper()}:
{message.content}

"""

        else:

            prompt += """
No previous conversation history.

"""

        prompt += """
----------------------------------------

Document Context

"""

        for chunk in (
            prompt_request.retrieved_chunks
        ):

            prompt += f"""
Document: {chunk.metadata.filename}
Department: {chunk.metadata.department}
Version: {chunk.metadata.version}
Page: {chunk.page_number}

Content:
{chunk.text}

----------------------------------------

"""

        prompt += f"""
Current Question:

{prompt_request.question}

Answer:
"""

        return prompt


prompt_service = PromptService()