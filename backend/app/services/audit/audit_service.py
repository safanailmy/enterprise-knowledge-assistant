from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog
from app.models.user import User

from app.repositories.audit_repository import (
    audit_repository
)

from app.schemas.responses.audit_log_responses import (
    AuditLogItem,
    AuditLogListResponse
)


class AuditService:

    def log(
        self,
        db: Session,
        current_user: User,
        action: str,
        resource_type: str,
        resource_id: str | None = None,
        details: dict | None = None
    ) -> AuditLog:

        audit_log = AuditLog(

            user_id=current_user.user_id,

            user_email=current_user.email,

            action=action,

            resource_type=resource_type,

            resource_id=resource_id,

            details=details

        )

        return audit_repository.save(

            db=db,

            audit_log=audit_log

        )

    def get_all_audit_logs(
        self,
        db: Session
    ) -> AuditLogListResponse:

        audit_logs = (
            audit_repository.get_all(
                db
            )
        )

        audit_log_items = [

            AuditLogItem(

                audit_id=(
                    audit_log.audit_id
                ),

                user_id=(
                    audit_log.user_id
                ),

                user_email=(
                    audit_log.user_email
                ),

                action=(
                    audit_log.action
                ),

                resource_type=(
                    audit_log.resource_type
                ),

                resource_id=(
                    audit_log.resource_id
                ),

                details=(
                    audit_log.details
                ),

                created_at=(
                    audit_log.created_at
                )

            )

            for audit_log in audit_logs

        ]

        return AuditLogListResponse(

            audit_logs=audit_log_items

        )


audit_service = AuditService()