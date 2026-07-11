from datetime import datetime

from pydantic import BaseModel


class DocumentItem(BaseModel):

    document_id: str

    document_group_id: str

    original_filename: str

    department: str

    uploaded_by: str

    upload_date: datetime

    version: int

    status: str


class DocumentListResponse(BaseModel):

    documents: list[DocumentItem]