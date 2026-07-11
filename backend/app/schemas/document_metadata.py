from datetime import datetime

from pydantic import BaseModel


class DocumentMetaData(BaseModel):

    document_id: str

    document_group_id: str

    filename: str

    department: str

    uploaded_by: str

    upload_date: datetime

    version: int