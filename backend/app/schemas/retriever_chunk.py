from pydantic import BaseModel

from app.schemas.document_metadata import (
    DocumentMetaData
)


class RetrievedChunk(BaseModel):

    text: str

    chunk_index: int

    page_number: int | None = None

    metadata: DocumentMetaData