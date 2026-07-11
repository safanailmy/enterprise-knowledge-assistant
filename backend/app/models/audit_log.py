from datetime import datetime
import uuid

from sqlalchemy import (
    String,
    DateTime,
    JSON
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column
)

from app.core.database import Base


class AuditLog(Base):

    __tablename__ = "audit_logs"

    audit_id: Mapped[str] = mapped_column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    user_id: Mapped[str] = mapped_column(
        String,
        nullable=False,
        index=True
    )

    user_email: Mapped[str] = mapped_column(
        String,
        nullable=False,
        index=True
    )

    action: Mapped[str] = mapped_column(
        String,
        nullable=False,
        index=True
    )

    resource_type: Mapped[str] = mapped_column(
        String,
        nullable=False,
        index=True
    )

    resource_id: Mapped[str | None] = mapped_column(
        String,
        nullable=True,
        index=True
    )

    details: Mapped[dict | None] = mapped_column(
        JSON,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
        index=True
    )