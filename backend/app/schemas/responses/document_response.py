from pydantic import BaseModel


class DocumentResponse(BaseModel):

    message: str

    document_id: str

    document_group_id: str

    filename: str

    department: str

    uploaded_by: str

    version: int