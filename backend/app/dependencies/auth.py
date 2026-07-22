from fastapi import (
    Depends,
    HTTPException
)

from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.core.security import (
    verify_access_token
)

from app.models.user import User

from app.repositories.user_repository import (
    user_repository
)

from app.enums.user_role import UserRole


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/users/login"
)



def get_current_user(

    token: str = Depends(oauth2_scheme),

    db: Session = Depends(get_db)

) -> User:
    
    print("TOKEN:", token)

    payload = verify_access_token(
        token
    )

    user_id = payload.get(
        "sub"
    )

    if user_id is None:

        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials."
        )

    user = user_repository.get_by_id(
        db,
        user_id
    )

    if user is None:

        raise HTTPException(
            status_code=401,
            detail="User not found."
        )

    return user

def require_admin(
    current_user: User = Depends(get_current_user)
) -> User:

    if current_user.role != UserRole.ADMIN.value:

        raise HTTPException(
            status_code=403,
            detail="Admin access required."
        )

    return current_user