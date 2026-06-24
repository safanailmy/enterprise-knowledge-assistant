from fastapi import FastAPI
from app.core.settings import settings
from app.api.health import health_router

app = FastAPI(
    title = settings.PROJECT_NAME,
    version=settings.VERSION
)

app.include_router(health_router)

@app.get("/")
def root():
    return{
        "settings.PROJECT_NAME"
    }