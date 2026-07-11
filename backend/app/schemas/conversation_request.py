from pydantic import BaseModel


class CreateConversationRequest(BaseModel):

    title: str | None = None


class UpdateConversationRequest(BaseModel):

    title: str