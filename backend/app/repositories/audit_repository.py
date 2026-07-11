from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog


class AuditRepository:

    def save(
        self,
        db: Session,
        audit_log: AuditLog
    ) -> AuditLog:

        try:

            db.add(
                audit_log
            )

            db.commit()

            db.refresh(
                audit_log
            )

            return audit_log

        except Exception:

            db.rollback()

            raise

    def get_all(
        self,
        db: Session
    ) -> list[AuditLog]:

        return (

            db.query(
                AuditLog
            )

            .order_by(
                AuditLog.created_at.desc()
            )

            .all()

        )


audit_repository = AuditRepository()