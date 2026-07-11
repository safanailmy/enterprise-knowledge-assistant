from sqlalchemy import (
    func,
    distinct
)

from sqlalchemy.orm import Session

from app.models.user import User

from app.models.document import Document

from app.models.conversation import (
    Conversation
)

from app.models.message import Message

from app.models.audit_log import AuditLog

from app.enums.audit_action import (
    AuditAction
)


class AnalyticsRepository:

    def get_total_users(
        self,
        db: Session
    ) -> int:

        return (
            db.query(
                func.count(User.user_id)
            )
            .scalar()
            or 0
        )

    def get_active_users(
        self,
        db: Session
    ) -> int:

        return (
            db.query(
                func.count(User.user_id)
            )
            .filter(
                User.is_active.is_(True)
            )
            .scalar()
            or 0
        )

    def get_total_documents(
        self,
        db: Session
    ) -> int:

        return (
            db.query(
                func.count(
                    distinct(
                        Document.document_group_id
                    )
                )
            )
            .filter(
                Document.is_deleted.is_(False)
            )
            .scalar()
            or 0
        )

    def get_total_document_versions(
        self,
        db: Session
    ) -> int:

        return (
            db.query(
                func.count(
                    Document.document_id
                )
            )
            .scalar()
            or 0
        )

    def get_total_conversations(
        self,
        db: Session
    ) -> int:

        return (
            db.query(
                func.count(
                    Conversation.conversation_id
                )
            )
            .scalar()
            or 0
        )

    def get_total_messages(
        self,
        db: Session
    ) -> int:

        return (
            db.query(
                func.count(
                    Message.message_id
                )
            )
            .scalar()
            or 0
        )

    def get_total_chat_queries(
        self,
        db: Session
    ) -> int:

        return (
            db.query(
                func.count(
                    AuditLog.audit_id
                )
            )
            .filter(
                AuditLog.action
                == AuditAction.CHAT_QUERY.value
            )
            .scalar()
            or 0
        )

    def get_documents_by_department(
        self,
        db: Session
    ) -> list[tuple]:

        return (
            db.query(
                Document.department,
                func.count(
                    distinct(
                        Document.document_group_id
                    )
                )
            )
            .filter(
                Document.is_deleted.is_(False)
            )
            .group_by(
                Document.department
            )
            .order_by(
                func.count(
                    distinct(
                        Document.document_group_id
                    )
                ).desc()
            )
            .all()
        )

    def get_documents_by_status(
        self,
        db: Session
    ) -> list[tuple]:

        return (
            db.query(
                Document.status,
                func.count(
                    Document.document_id
                )
            )
            .filter(
                Document.is_deleted.is_(False)
            )
            .group_by(
                Document.status
            )
            .order_by(
                func.count(
                    Document.document_id
                ).desc()
            )
            .all()
        )

    def get_recent_uploads(
        self,
        db: Session,
        limit: int = 5
    ) -> list[Document]:

        return (
            db.query(
                Document
            )
            .filter(
                Document.is_deleted.is_(False)
            )
            .order_by(
                Document.upload_date.desc()
            )
            .limit(limit)
            .all()
        )

    def get_users_by_role(
        self,
        db: Session
    ) -> list[tuple]:

        return (
            db.query(
                User.role,
                func.count(
                    User.user_id
                )
            )
            .group_by(
                User.role
            )
            .order_by(
                func.count(
                    User.user_id
                ).desc()
            )
            .all()
        )

    def get_users_by_department(
        self,
        db: Session
    ) -> list[tuple]:

        return (
            db.query(
                User.department,
                func.count(
                    User.user_id
                )
            )
            .group_by(
                User.department
            )
            .order_by(
                func.count(
                    User.user_id
                ).desc()
            )
            .all()
        )

    def get_chat_query_logs(
        self,
        db: Session
    ) -> list[AuditLog]:

        return (
            db.query(
                AuditLog
            )
            .filter(
                AuditLog.action
                == AuditAction.CHAT_QUERY.value
            )
            .order_by(
                AuditLog.created_at.desc()
            )
            .all()
        )

    def get_recent_activity(
        self,
        db: Session,
        limit: int = 10
    ) -> list[AuditLog]:

        return (
            db.query(
                AuditLog
            )
            .order_by(
                AuditLog.created_at.desc()
            )
            .limit(limit)
            .all()
        )


analytics_repository = (
    AnalyticsRepository()
)