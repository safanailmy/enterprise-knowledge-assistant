from pydantic import (
    BaseModel,
    EmailStr
)

from app.enums.user_role import UserRole


class CreateUserRequest(BaseModel):

    full_name: str

    email: EmailStr

    password: str

    department: str

    role: UserRole