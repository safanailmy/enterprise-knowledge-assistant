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

from app.schemas.responses.analytics_response import (
    AnalyticsDashboardResponse
)

from app.services.analytics.analytics_service import (
    analytics_service
)


router = APIRouter(

    prefix="/analytics",

    tags=["Analytics"]

)


@router.get(

    "/dashboard",

    response_model=(
        AnalyticsDashboardResponse
    )

)
def get_dashboard_analytics(

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        require_admin
    )

):

    return (
        analytics_service.get_dashboard(
            db=db
        )
    )