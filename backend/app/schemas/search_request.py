from pydantic import BaseModel

class SearchRequest(BaseModel):
    embedding: list[float]
    top_k:int
    department: str | None = None
    uploaded_by: str | None = None
    version: int | None = None
    status: str | None = None