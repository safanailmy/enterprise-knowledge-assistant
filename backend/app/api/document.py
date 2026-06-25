from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form
)

from app.services.document_service import (
    document_service
)

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


@router.post("/upload")
def upload_document(
    file: UploadFile = File(...),
    department: str = Form(...)
):

    return document_service.save_document(
        file,
        department
    )