from datetime import datetime
import uuid

from sqlalchemy import (
    String,
    Integer,
    DateTime,
    Boolean
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column
)

from app.core.database import Base

from app.enums.document_status import (
    DocumentStatus
)


class Document(Base):

    __tablename__ = "documents"

    document_id: Mapped[str] = mapped_column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    document_group_id: Mapped[str] = mapped_column(
        String,
        nullable=False,
        index=True
    )

    original_filename: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    stored_filename: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    file_path: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    department: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    uploaded_by: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    upload_date: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    version: Mapped[int] = mapped_column(
        Integer,
        default=1,
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        String,
        default=DocumentStatus.PROCESSING.value,
        nullable=False
    )

    is_deleted: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    mime_type: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )