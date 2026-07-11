from pydantic import BaseModel


class UserResponse(BaseModel):

    message: str

    user_id: str

    full_name: str

    email: str

    department: str

    role: str