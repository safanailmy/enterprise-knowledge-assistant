import uuid

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

from app.models.user import User

from app.repositories.user_repository import (
    user_repository
)

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


class UserService:

    def create_user(
        self,
        request: CreateUserRequest,
        db: Session
    ) -> UserResponse:

        normalized_email = request.email.strip().lower()

        existing_user = user_repository.get_by_email(
            db,
            normalized_email
        )

        if existing_user is not None:

            raise HTTPException(
                status_code=400,
                detail="Email already exists."
            )

        hashed_password = hash_password(
            request.password
        )

        user = User(

            user_id=str(uuid.uuid4()),

            full_name=request.full_name.strip(),

            email=normalized_email,

            password_hash=hashed_password,

            department=request.department,

            role=request.role.value

        )

        saved_user = user_repository.save(
            db,
            user
        )

        return UserResponse(

            message="User created successfully.",

            user_id=saved_user.user_id,

            full_name=saved_user.full_name,

            email=saved_user.email,

            department=saved_user.department,

            role=saved_user.role

        )

    def login(
        self,
        request: LoginRequest,
        db: Session
    ) -> LoginResponse:

        email = request.email.strip().lower()

        user = user_repository.get_by_email(
            db,
            email
        )

        if user is None:

            raise HTTPException(
                status_code=401,
                detail="Invalid email or password."
            )

        if not verify_password(
            request.password,
            user.password_hash
        ):

            raise HTTPException(
                status_code=401,
                detail="Invalid email or password."
            )

        access_token = create_access_token(
            user
        )

        return LoginResponse(

            access_token=access_token,

            token_type="Bearer"

        )


user_service = UserService()