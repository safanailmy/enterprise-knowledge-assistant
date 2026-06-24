from fastapi import FastAPI
from app.core.settings import settings
from app.api.health import router
from app.api.document import (
    router as documents_router
)

app = FastAPI(
    title = settings.PROJECT_NAME,
    version=settings.VERSION
)

app.include_router(router)
app.include_router(
    documents_router
)

@app.get("/")
def root():
    return{
        "message": settings.PROJECT_NAME
    }