from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.auth import (
    require_admin
)

from app.models.user import User

from app.schemas.responses.audit_log_responses import (
    AuditLogListResponse
)

from app.services.audit.audit_service import (
    audit_service
)


router = APIRouter(

    prefix="/audit-logs",

    tags=["Audit Logs"]

)


@router.get(

    "/",

    response_model=AuditLogListResponse

)
def get_all_audit_logs(

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        require_admin
    )

):

    return (
        audit_service.get_all_audit_logs(
            db=db
        )
    )