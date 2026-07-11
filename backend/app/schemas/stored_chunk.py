from pydantic import BaseModel

from app.schemas.document_metadata import (
    DocumentMetaData
)


class StoredChunk(BaseModel):

    text: str

    embedding: list[float]

    chunk_index: int

    page_number: int | None = None

    metadata: DocumentMetaData