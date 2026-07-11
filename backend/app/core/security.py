from datetime import (
    datetime,
    timedelta,
    timezone
)

from jose import (jwt,JWTError)

from pwdlib import PasswordHash

from app.core.settings import settings

from app.models.user import User

from fastapi import HTTPException


password_hash = PasswordHash.recommended()


def hash_password(
    password: str
) -> str:

    return password_hash.hash(
        password
    )


def verify_password(
    password: str,
    hashed_password: str
) -> bool:

    return password_hash.verify(
        password,
        hashed_password
    )


def create_access_token(
    user: User
) -> str:

    expire = datetime.now(
        timezone.utc
    ) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {

        "sub": user.user_id,

        "email": user.email,

        "department": user.department,

        "role": user.role,

        "exp": expire

    }

    token = jwt.encode(

        payload,

        settings.SECRET_KEY,

        algorithm=settings.ALGORITHM

    )

    return token

def verify_access_token(
    token: str
) -> dict:

    try:

        payload = jwt.decode(

            token,

            settings.SECRET_KEY,

            algorithms=[settings.ALGORITHM]

        )

        return payload

    except JWTError:

        raise HTTPException(

            status_code=401,

            detail="Invalid or expired token."

        )