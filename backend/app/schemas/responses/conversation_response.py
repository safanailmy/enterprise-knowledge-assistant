from datetime import datetime

from pydantic import BaseModel


class ConversationItem(BaseModel):

    conversation_id: str

    title: str

    created_at: datetime

    updated_at: datetime


class ConversationListResponse(BaseModel):

    conversations: list[ConversationItem]


class MessageItem(BaseModel):

    message_id: str

    role: str

    content: str

    sources: list | None

    created_at: datetime


class ConversationDetailResponse(BaseModel):

    conversation_id: str

    title: str

    created_at: datetime

    updated_at: datetime

    messages: list[MessageItem]