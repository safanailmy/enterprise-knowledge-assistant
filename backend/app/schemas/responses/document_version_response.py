from datetime import datetime

from pydantic import BaseModel


class DocumentVersionItem(BaseModel):

    document_id: str

    document_group_id: str

    original_filename: str

    department: str

    uploaded_by: str

    upload_date: datetime

    version: int

    status: str

    is_deleted: bool


class DocumentVersionHistoryResponse(BaseModel):

    document_group_id: str

    versions: list[DocumentVersionItem]