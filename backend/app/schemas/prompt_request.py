from pydantic import BaseModel

from app.schemas.retriever_chunk import (
    RetrievedChunk
)


class ConversationHistoryItem(
    BaseModel
):

    role: str

    content: str


class PromptRequest(BaseModel):

    question: str

    conversation_history: list[
        ConversationHistoryItem
    ]

    retrieved_chunks: list[
        RetrievedChunk
    ]