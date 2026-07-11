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

from app.schemas.conversation_request import (
    CreateConversationRequest,
    UpdateConversationRequest
)

from app.schemas.responses.conversation_response import (
    ConversationItem,
    ConversationListResponse,
    ConversationDetailResponse
)

from app.services.conversation.conversation_service import (
    conversation_service
)


router = APIRouter(

    prefix="/conversations",

    tags=["Conversations"]

)


@router.post(
    "/",
    response_model=ConversationItem
)
def create_conversation(

    request: CreateConversationRequest,

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        get_current_user
    )

):

    return (
        conversation_service.create_conversation(

            db=db,

            current_user=current_user,

            request=request

        )
    )


@router.get(
    "/",
    response_model=ConversationListResponse
)
def get_my_conversations(

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        get_current_user
    )

):

    return (
        conversation_service.get_my_conversations(

            db=db,

            current_user=current_user

        )
    )


@router.get(
    "/{conversation_id}",
    response_model=ConversationDetailResponse
)
def get_conversation(

    conversation_id: str,

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        get_current_user
    )

):

    return (
        conversation_service.get_conversation(

            db=db,

            conversation_id=conversation_id,

            current_user=current_user

        )
    )


@router.patch(
    "/{conversation_id}",
    response_model=ConversationItem
)
def rename_conversation(

    conversation_id: str,

    request: UpdateConversationRequest,

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        get_current_user
    )

):

    return (
        conversation_service.rename_conversation(

            db=db,

            conversation_id=conversation_id,

            current_user=current_user,

            request=request

        )
    )


@router.delete(
    "/{conversation_id}"
)
def delete_conversation(

    conversation_id: str,

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        get_current_user
    )

):

    conversation_service.delete_conversation(

        db=db,

        conversation_id=conversation_id,

        current_user=current_user

    )

    return {

        "message": (
            "Conversation deleted "
            "successfully."
        )

    }