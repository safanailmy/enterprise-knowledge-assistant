from pydantic import BaseModel
from datetime import datetime

class DocumentCreate(BaseModel):
    department: str

class DocumentResponse(BaseModel):
    id: int
    filenanme: str
    department: str
    uploaded_by: str
    upload_date: datetime