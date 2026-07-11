from pydantic import BaseModel


class ChatRequest(BaseModel):

    conversation_id: str

    question: str

    department: str | None = None

    uploaded_by: str | None = None

    version: int | None = None

    status: str | None = None