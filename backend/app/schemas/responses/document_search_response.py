from app.schemas.responses.document_list_response import (
    DocumentItem
)

from pydantic import BaseModel


class DocumentSearchResponse(BaseModel):

    documents: list[DocumentItem]

    page: int

    page_size: int

    total: int

    total_pages: int