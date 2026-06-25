from dataclasses import dataclass
from datetime import datetime

@dataclass
class document:
    id: int
    filename: str
    department: str
    uploaded_by: str
    upload_date: datetime