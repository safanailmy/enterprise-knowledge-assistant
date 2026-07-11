from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.auth import (
    get_current_user
)

from app.models.user import User

from app.schemas.chat_request import (
    ChatRequest
)

from app.services.chat.chat_service import (
    chat_service
)


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/")
def ask_question(

    chat_request: ChatRequest,

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        get_current_user
    )

):

    return chat_service.chat(

        chat_request=chat_request,

        current_user=current_user,

        db=db

    )