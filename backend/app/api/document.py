from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.auth import (
    get_current_user,
    require_admin
)

from app.models.user import User

from app.services.document.document_service import (
    document_service
)

from app.schemas.responses.document_response import (
    DocumentResponse
)

from app.schemas.responses.document_list_response import (
    DocumentListResponse
)

from app.schemas.responses.document_version_response import (
    DocumentVersionHistoryResponse
)


from typing import Literal

from fastapi import Query

from app.schemas.responses.document_search_response import (
    DocumentSearchResponse
)

from fastapi.responses import FileResponse

router = APIRouter(

    prefix="/documents",

    tags=["Documents"]

)


@router.post(

    "/upload",

    response_model=DocumentResponse

)
def upload_document(

    file: UploadFile = File(...),

    department: str = Form(...),

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        require_admin
    )

):

    return document_service.save_document(

        file=file,

        department=department,

        current_user=current_user,

        db=db

    )


@router.post(

    "/{document_group_id}/versions",

    response_model=DocumentResponse

)
def upload_new_version(

    document_group_id: str,

    file: UploadFile = File(...),

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        require_admin
    )

):

    return (
        document_service.upload_new_version(

            file=file,

            document_group_id=(
                document_group_id
            ),

            current_user=current_user,

            db=db

        )
    )


@router.get(

    "/",

    response_model=DocumentListResponse

)
def get_all_documents(

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        get_current_user
    )

):

    return (
        document_service.get_all_documents(

            db=db,

            current_user=current_user

        )
    )


@router.get(

    "/deleted",

    response_model=DocumentListResponse

)
def get_deleted_documents(

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        require_admin
    )

):

    return (
        document_service
        .get_deleted_documents(
            db=db
        )
    )


@router.get(

    "/groups/{document_group_id}/versions",

    response_model=(
        DocumentVersionHistoryResponse
    )

)
def get_version_history(

    document_group_id: str,

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        get_current_user
    )

):

    return (
        document_service.get_version_history(

            db=db,

            document_group_id=(
                document_group_id
            ),

            current_user=current_user

        )
    )


@router.post(

    "/versions/{document_id}/rollback",

    response_model=DocumentResponse

)
def rollback_version(

    document_id: str,

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        require_admin
    )

):

    return (
        document_service.rollback_version(

            db=db,

            document_id=document_id,

            current_user=current_user

        )
    )


@router.get(
    "/search",
    response_model=DocumentSearchResponse
)
def search_documents(

    query: str | None = None,

    department: str | None = None,

    uploaded_by: str | None = None,

    status: str | None = None,

    page: int = Query(
        default=1,
        ge=1
    ),

    page_size: int = Query(
        default=20,
        ge=1,
        le=100
    ),

    sort_by: Literal[
        "upload_date",
        "filename",
        "version"
    ] = "upload_date",

    sort_order: Literal[
        "asc",
        "desc"
    ] = "desc",

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        get_current_user
    )

):

    return (
        document_service.search_documents(

            db=db,

            current_user=current_user,

            query=query,

            department=department,

            uploaded_by=uploaded_by,

            status=status,

            page=page,

            page_size=page_size,

            sort_by=sort_by,

            sort_order=sort_order

        )
    )


@router.get(
    "/{document_id}/download"
)
def download_document(

    document_id: str,

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        get_current_user
    )

):

    document = (
        document_service
        .get_document_for_download(

            db=db,

            document_id=document_id,

            current_user=current_user

        )
    )

    return FileResponse(

        path=document.file_path,

        media_type=document.mime_type,

        filename=(
            document.original_filename
        )

    )

@router.get("/{document_id}")
def get_document_by_id(

    document_id: str,

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        get_current_user
    )

):

    document = (
        document_service.get_document_by_id(

            db=db,

            document_id=document_id,

            current_user=current_user

        )
    )

    if document is None:

        raise HTTPException(

            status_code=404,

            detail=(
                "Document not found."
            )

        )

    return document


@router.delete(

    "/{document_id}/permanent"

)
def permanently_delete_document(

    document_id: str,

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        require_admin
    )

):

    document_service.permanently_delete_document(

        db=db,

        document_id=document_id,

        current_user=current_user

    )

    return {

        "message": (
            "Document and all versions "
            "permanently deleted."
        )

    }


@router.delete("/{document_id}")
def delete_document(

    document_id: str,

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        require_admin
    )

):

    document_service.soft_delete_document(

        db=db,

        document_id=document_id,

        current_user=current_user

    )

    return {

        "message": (
            "Document and all versions "
            "moved to the Recycle Bin."
        )

    }


@router.patch(

    "/{document_id}/restore"

)
def restore_document(

    document_id: str,

    db: Session = Depends(
        get_db
    ),

    current_user: User = Depends(
        require_admin
    )

):

    document_service.restore_document(

        db=db,

        document_id=document_id,

        current_user=current_user

    )

    return {

        "message": (
            "Document and all versions "
            "restored successfully."
        )

    }