from datetime import datetime
import uuid

from sqlalchemy import (
    String,
    Text,
    DateTime,
    ForeignKey,
    JSON
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)

from app.core.database import Base


class Message(Base):

    __tablename__ = "messages"

    message_id: Mapped[str] = mapped_column(

        String,

        primary_key=True,

        default=lambda: str(
            uuid.uuid4()
        )

    )

    conversation_id: Mapped[str] = mapped_column(

        String,

        ForeignKey(
            "conversations.conversation_id",
            ondelete="CASCADE"
        ),

        nullable=False,

        index=True

    )

    role: Mapped[str] = mapped_column(

        String,

        nullable=False

    )

    content: Mapped[str] = mapped_column(

        Text,

        nullable=False

    )

    sources: Mapped[list | None] = mapped_column(

        JSON,

        nullable=True

    )

    created_at: Mapped[datetime] = mapped_column(

        DateTime,

        default=datetime.utcnow,

        nullable=False,

        index=True

    )

    conversation = relationship(

        "Conversation",

        back_populates="messages"

    )