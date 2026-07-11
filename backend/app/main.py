from fastapi import FastAPI

from app.core.settings import settings

from app.api.health import (
    router
)

from app.api.document import (
    router as documents_router
)

from app.api.chat import (
    router as chat_router
)

from app.api.user import (
    router as users_router
)

from app.models.audit_log import AuditLog

from app.api.audit_log import (
    router as audit_logs_router
)

from app.api.conversation import (
    router as conversations_router
)

from app.api.analytics import (
    router as analytics_router
)

app = FastAPI(

    title=settings.PROJECT_NAME,

    version=settings.VERSION

)


app.include_router(
    router
)

app.include_router(
    documents_router
)

app.include_router(
    chat_router
)

app.include_router(
    users_router
)

app.include_router(
    audit_logs_router
)

app.include_router(
    conversations_router
)

app.include_router(
    analytics_router
)

from app.api.analytics import (
    router as analytics_router
)

@app.get("/")
def root():

    return {

        "message":
        settings.PROJECT_NAME

    }