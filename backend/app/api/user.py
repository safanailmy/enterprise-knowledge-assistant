from fastapi import (
    APIRouter,
    Depends
)

from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.auth import get_current_user

from app.models.user import User

from app.schemas.requests.user_requests import (
    CreateUserRequest
)

from app.schemas.requests.login_request import (
    LoginRequest
)

from app.schemas.responses.user_response import (
    UserResponse
)

from app.schemas.responses.login_response import (
    LoginResponse
)

from app.services.user.user_service import (
    user_service
)

from app.dependencies.auth import (
    get_current_user,
    require_admin
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post(
    "",
    response_model=UserResponse
)
def create_user(
    request: CreateUserRequest,
    db: Session = Depends(get_db)
):

    return user_service.create_user(
        request,
        db
    )


@router.post(
    "/login",
    response_model=LoginResponse
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    login_request = LoginRequest(
        email=form_data.username,
        password=form_data.password
    )

    return user_service.login(
        login_request,
        db
    )


@router.get("/me")
def get_my_profile(
    current_user: User = Depends(get_current_user)
):

    return {
        "user_id": current_user.user_id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "department": current_user.department,
        "role": current_user.role
    }

@router.get("/admin-test")
def admin_test(
    current_user: User = Depends(require_admin)
):

    return {
        "message": "Admin access granted.",
        "user_id": current_user.user_id,
        "email": current_user.email,
        "role": current_user.role
    }