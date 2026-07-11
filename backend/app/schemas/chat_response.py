from pydantic import BaseModel


class Source(BaseModel):

    document_id: str

    filename: str

    version: int

    page_number: int | None = None

    chunk_index: int


class ChatResponse(BaseModel):

    conversation_id: str

    answer: str

    sources: list[Source]