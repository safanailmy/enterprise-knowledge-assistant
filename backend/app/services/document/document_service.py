from pathlib import Path

import os
import shutil
import uuid

from fastapi import (
    UploadFile,
    HTTPException
)

from sqlalchemy.orm import Session

from app.models.document import Document
from app.models.user import User

from app.enums.document_status import (
    DocumentStatus
)

from app.enums.user_role import (
    UserRole
)

from app.repositories.document_repository import (
    document_repository
)

from app.schemas.document_metadata import (
    DocumentMetaData
)

from app.schemas.responses.document_response import (
    DocumentResponse
)

from app.schemas.responses.document_list_response import (
    DocumentItem,
    DocumentListResponse
)

from app.schemas.responses.document_version_response import (
    DocumentVersionItem,
    DocumentVersionHistoryResponse
)

from app.services.ingestion.ingestion_service import (
    ingestion_service
)

from app.services.rag.chroma_service import (
    chroma_service
)

from app.enums.audit_action import (
    AuditAction
)

from app.services.audit.audit_service import (
    audit_service
)

from app.schemas.responses.document_search_response import (
    DocumentSearchResponse
)

class DocumentService:

    UPLOAD_DIR = Path("uploads")

    def _build_metadata(
        self,
        document: Document
    ) -> DocumentMetaData:

        return DocumentMetaData(

            document_id=(
                document.document_id
            ),

            document_group_id=(
                document.document_group_id
            ),

            filename=(
                document.original_filename
            ),

            department=(
                document.department
            ),

            uploaded_by=(
                document.uploaded_by
            ),

            upload_date=(
                document.upload_date
            ),

            version=(
                document.version
            )

        )

    def _build_document_item(
        self,
        document: Document
    ) -> DocumentItem:

        return DocumentItem(

            document_id=(
                document.document_id
            ),

            document_group_id=(
                document.document_group_id
            ),

            original_filename=(
                document.original_filename
            ),

            department=(
                document.department
            ),

            uploaded_by=(
                document.uploaded_by
            ),

            upload_date=(
                document.upload_date
            ),

            version=(
                document.version
            ),

            status=(
                document.status
            )

        )

    def _build_response(
        self,
        document: Document,
        message: str
    ) -> DocumentResponse:

        return DocumentResponse(

            message=message,

            document_id=(
                document.document_id
            ),

            document_group_id=(
                document.document_group_id
            ),

            filename=(
                document.original_filename
            ),

            department=(
                document.department
            ),

            uploaded_by=(
                document.uploaded_by
            ),

            version=(
                document.version
            )

        )

    def save_document(
        self,
        file: UploadFile,
        department: str,
        current_user: User,
        db: Session
    ) -> DocumentResponse:

        document_group_id = str(
            uuid.uuid4()
        )

        response = self._save_version(

            file=file,

            department=department,

            uploaded_by=current_user.email,

            document_group_id=(
                document_group_id
            ),

            version=1,

            db=db,

            success_message=(
                "Document uploaded successfully."
            )

        )

        audit_service.log(

            db=db,

            current_user=current_user,

            action=(
                AuditAction
                .DOCUMENT_UPLOADED
                .value
            ),

            resource_type="DOCUMENT",

            resource_id=(
                response.document_group_id
            ),

            details={

                "document_id": (
                    response.document_id
                ),

                "document_group_id": (
                    response.document_group_id
                ),

                "filename": (
                    response.filename
                ),

                "department": (
                    response.department
                ),

                "version": (
                    response.version
                )

            }

        )

        return response

    def upload_new_version(
        self,
        file: UploadFile,
        document_group_id: str,
        current_user: User,
        db: Session
    ) -> DocumentResponse:

        latest_document = (
            document_repository
            .get_latest_by_group_id(

                db,

                document_group_id

            )
        )

        if latest_document is None:

            raise HTTPException(

                status_code=404,

                detail=(
                    "Document group not found."
                )

            )

        next_version = (
            document_repository
            .get_next_version_number(

                db,

                document_group_id

            )
        )

        response = self._save_version(

            file=file,

            department=(
                latest_document.department
            ),

            uploaded_by=(
                current_user.email
            ),

            document_group_id=(
                document_group_id
            ),

            version=next_version,

            db=db,

            success_message=(
                "New document version "
                "uploaded successfully."
            )

        )

        audit_service.log(

            db=db,

            current_user=current_user,

            action=(
                AuditAction
                .DOCUMENT_VERSION_CREATED
                .value
            ),

            resource_type="DOCUMENT",

            resource_id=(
                document_group_id
            ),

            details={

                "document_id": (
                    response.document_id
                ),

                "document_group_id": (
                    document_group_id
                ),

                "filename": (
                    response.filename
                ),

                "department": (
                    response.department
                ),

                "version": (
                    response.version
                )

            }

        )

        return response

    def _save_version(
        self,
        file: UploadFile,
        department: str,
        uploaded_by: str,
        document_group_id: str,
        version: int,
        db: Session,
        success_message: str
    ) -> DocumentResponse:

        self.UPLOAD_DIR.mkdir(
            exist_ok=True
        )

        document_id = str(
            uuid.uuid4()
        )

        original_filename = (
            file.filename
            or "document"
        )

        extension = Path(
            original_filename
        ).suffix

        stored_filename = (
            f"{document_id}{extension}"
        )

        file_path = (
            self.UPLOAD_DIR
            / stored_filename
        )

        with open(
            file_path,
            "wb"
        ) as buffer:

            buffer.write(
                file.file.read()
            )

        document = Document(

            document_id=(
                document_id
            ),

            document_group_id=(
                document_group_id
            ),

            original_filename=(
                original_filename
            ),

            stored_filename=(
                stored_filename
            ),

            file_path=str(
                file_path
            ),

            department=(
                department
            ),

            uploaded_by=(
                uploaded_by
            ),

            mime_type=(

                file.content_type

                or

                "application/octet-stream"

            ),

            version=version,

            status=(
                DocumentStatus
                .PROCESSING
                .value
            )

        )

        document_repository.save(
            db,
            document
        )

        metadata = self._build_metadata(
            document
        )

        try:

            ingestion_service.process(

                file_path=file_path,

                metadata=metadata

            )

            document_repository.update_status(

                db,

                document.document_id,

                DocumentStatus.READY.value

            )

            document.status = (
                DocumentStatus.READY.value
            )

            return self._build_response(

                document,

                success_message

            )

        except Exception:

            document_repository.update_status(

                db,

                document.document_id,

                DocumentStatus.FAILED.value

            )

            try:

                chroma_service.delete_by_document_id(

                    document.document_id

                )

            except Exception:

                pass

            try:

                if file_path.exists():

                    file_path.unlink()

            except Exception:

                pass

            raise

    def get_all_documents(
        self,
        db: Session,
        current_user: User
    ) -> DocumentListResponse:

        if (
            current_user.role
            == UserRole.ADMIN.value
        ):

            documents = (
                document_repository
                .get_all_latest(
                    db
                )
            )

        else:

            documents = (
                document_repository
                .get_all_latest_by_department(

                    db,

                    current_user.department

                )
            )

        document_items = [

            self._build_document_item(
                document
            )

            for document in documents

        ]

        return DocumentListResponse(

            documents=document_items

        )


    def search_documents(
        self,
        db: Session,
        current_user: User,
        query: str | None = None,
        department: str | None = None,
        uploaded_by: str | None = None,
        status: str | None = None,
        page: int = 1,
        page_size: int = 20,
        sort_by: str = "upload_date",
        sort_order: str = "desc"
    )-> DocumentSearchResponse:

        if query:

            query = query.strip()

            if not query:

                query = None

        if (
            current_user.role
            != UserRole.ADMIN.value
        ):

            authorized_department = (
                current_user.department
            )

        else:

            authorized_department = (
                department
            )

        documents, total = (

            document_repository
            .search_latest_documents(

                db=db,

                query=query,

                department=(
                    authorized_department
                ),

                uploaded_by=uploaded_by,

                status=status,

                page=page,

                page_size=page_size,

                sort_by=sort_by,

                sort_order=sort_order

            )

        )

        document_items = [

            self._build_document_item(
                document
            )

            for document in documents

        ]

        total_pages = (

            (
                total + page_size - 1
            )

            // page_size

        )

        return DocumentSearchResponse(

            documents=document_items,

            page=page,

            page_size=page_size,

            total=total,

            total_pages=total_pages

        )


    def get_deleted_documents(
        self,
        db: Session
    ) -> DocumentListResponse:

        documents = (
            document_repository
            .get_all_deleted_latest(
                db
            )
        )

        document_items = [

            self._build_document_item(
                document
            )

            for document in documents

        ]

        return DocumentListResponse(

            documents=document_items

        )

    def get_document_by_id(
        self,
        db: Session,
        document_id: str,
        current_user: User
    ) -> Document | None:

        document = (
            document_repository.get_by_id(

                db,

                document_id

            )
        )

        if document is None:

            return None

        if (
            current_user.role
            != UserRole.ADMIN.value
            and
            document.department
            != current_user.department
        ):

            raise HTTPException(

                status_code=403,

                detail=(
                    "You do not have access "
                    "to this document."
                )

            )

        return document

    def get_version_history(
        self,
        db: Session,
        document_group_id: str,
        current_user: User
    ) -> DocumentVersionHistoryResponse:

        versions = (
            document_repository
            .get_versions_by_group_id(

                db,

                document_group_id

            )
        )

        if not versions:

            raise HTTPException(

                status_code=404,

                detail=(
                    "Document group not found."
                )

            )

        if (
            current_user.role
            != UserRole.ADMIN.value
            and
            versions[0].department
            != current_user.department
        ):

            raise HTTPException(

                status_code=403,

                detail=(
                    "You do not have access "
                    "to this document."
                )

            )

        version_items = []

        for document in versions:

            version_items.append(

                DocumentVersionItem(

                    document_id=(
                        document.document_id
                    ),

                    document_group_id=(
                        document.document_group_id
                    ),

                    original_filename=(
                        document.original_filename
                    ),

                    department=(
                        document.department
                    ),

                    uploaded_by=(
                        document.uploaded_by
                    ),

                    upload_date=(
                        document.upload_date
                    ),

                    version=(
                        document.version
                    ),

                    status=(
                        document.status
                    ),

                    is_deleted=(
                        document.is_deleted
                    )

                )

            )

        return DocumentVersionHistoryResponse(

            document_group_id=(
                document_group_id
            ),

            versions=version_items

        )

    def rollback_version(
        self,
        db: Session,
        document_id: str,
        current_user: User
    ) -> DocumentResponse:

        source_document = (
            document_repository
            .get_by_id_including_deleted(

                db,

                document_id

            )
        )

        if source_document is None:

            raise HTTPException(

                status_code=404,

                detail=(
                    "Document version not found."
                )

            )

        if source_document.is_deleted:

            raise HTTPException(

                status_code=400,

                detail=(
                    "Restore the document before "
                    "rolling back a version."
                )

            )

        if (
            source_document.status
            != DocumentStatus.READY.value
        ):

            raise HTTPException(

                status_code=400,

                detail=(
                    "Only a READY version can "
                    "be rolled back."
                )

            )

        source_path = Path(
            source_document.file_path
        )

        if not source_path.exists():

            raise HTTPException(

                status_code=404,

                detail=(
                    "Source document file "
                    "not found."
                )

            )

        next_version = (
            document_repository
            .get_next_version_number(

                db,

                source_document
                .document_group_id

            )
        )

        new_document_id = str(
            uuid.uuid4()
        )

        extension = (
            source_path.suffix
        )

        stored_filename = (
            f"{new_document_id}{extension}"
        )

        new_file_path = (
            self.UPLOAD_DIR
            / stored_filename
        )

        shutil.copy2(

            source_path,

            new_file_path

        )

        new_document = Document(

            document_id=(
                new_document_id
            ),

            document_group_id=(
                source_document
                .document_group_id
            ),

            original_filename=(
                source_document
                .original_filename
            ),

            stored_filename=(
                stored_filename
            ),

            file_path=str(
                new_file_path
            ),

            department=(
                source_document.department
            ),

            uploaded_by=(
                current_user.email
            ),

            mime_type=(
                source_document.mime_type
            ),

            version=(
                next_version
            ),

            status=(
                DocumentStatus
                .PROCESSING
                .value
            )

        )

        document_repository.save(

            db,

            new_document

        )

        try:

            ingestion_service.process(

                file_path=new_file_path,

                metadata=self._build_metadata(
                    new_document
                )

            )

            document_repository.update_status(

                db,

                new_document.document_id,

                DocumentStatus.READY.value

            )

            new_document.status = (
                DocumentStatus.READY.value
            )

            response = self._build_response(

                new_document,

                (
                    "Document version rolled "
                    "back successfully."
                )

            )

            audit_service.log(

                db=db,

                current_user=current_user,

                action=(
                    AuditAction
                    .DOCUMENT_ROLLED_BACK
                    .value
                ),

                resource_type="DOCUMENT",

                resource_id=(
                    new_document.document_group_id
                ),

                details={

                    "new_document_id": (
                        new_document.document_id
                    ),

                    "document_group_id": (
                        new_document.document_group_id
                    ),

                    "source_document_id": (
                        source_document.document_id
                    ),

                    "source_version": (
                        source_document.version
                    ),

                    "new_version": (
                        new_document.version
                    ),

                    "filename": (
                        new_document.original_filename
                    ),

                    "department": (
                        new_document.department
                    )

                }

            )

            return response

        except Exception:

            document_repository.update_status(

                db,

                new_document.document_id,

                DocumentStatus.FAILED.value

            )

            try:

                chroma_service.delete_by_document_id(

                    new_document.document_id

                )

            except Exception:

                pass

            try:

                if new_file_path.exists():

                    new_file_path.unlink()

            except Exception:

                pass

            raise

    def soft_delete_document(
        self,
        db: Session,
        document_id: str,
        current_user: User
    ) -> None:

        document = (
            document_repository.get_by_id(

                db,

                document_id

            )
        )

        if document is None:

            raise HTTPException(

                status_code=404,

                detail=(
                    "Document not found."
                )

            )

        document_group_id = (
            document.document_group_id
        )

        details = {

            "document_id": (
                document.document_id
            ),

            "document_group_id": (
                document_group_id
            ),

            "filename": (
                document.original_filename
            ),

            "department": (
                document.department
            ),

            "latest_version": (
                document.version
            )

        }

        document_repository.soft_delete_group(

            db,

            document_group_id

        )

        audit_service.log(

            db=db,

            current_user=current_user,

            action=(
                AuditAction
                .DOCUMENT_SOFT_DELETED
                .value
            ),

            resource_type="DOCUMENT",

            resource_id=(
                document_group_id
            ),

            details=details

        )

    def restore_document(
        self,
        db: Session,
        document_id: str,
        current_user: User
    ) -> None:

        document = (
            document_repository
            .get_deleted_by_id(

                db,

                document_id

            )
        )

        if document is None:

            raise HTTPException(

                status_code=404,

                detail=(
                    "Deleted document not found."
                )

            )

        document_group_id = (
            document.document_group_id
        )

        details = {

            "document_id": (
                document.document_id
            ),

            "document_group_id": (
                document_group_id
            ),

            "filename": (
                document.original_filename
            ),

            "department": (
                document.department
            ),

            "version": (
                document.version
            )

        }

        document_repository.restore_group(

            db,

            document_group_id

        )

        audit_service.log(

            db=db,

            current_user=current_user,

            action=(
                AuditAction
                .DOCUMENT_RESTORED
                .value
            ),

            resource_type="DOCUMENT",

            resource_id=(
                document_group_id
            ),

            details=details

        )

    def get_document_for_download(
        self,
        db: Session,
        document_id: str,
        current_user: User
    ) -> Document:

        document = (
            document_repository.get_by_id(

                db,

                document_id

            )
        )

        if document is None:

            raise HTTPException(

                status_code=404,

                detail=(
                    "Document not found."
                )

            )

        if (
            current_user.role
            != UserRole.ADMIN.value
            and
            document.department
            != current_user.department
        ):

            raise HTTPException(

                status_code=403,

                detail=(
                    "You do not have access "
                    "to this document."
                )

            )

        file_path = Path(
            document.file_path
        )

        if not file_path.exists():

            raise HTTPException(

                status_code=404,

                detail=(
                    "Document file not found."
                )

            )

        return document

    def permanently_delete_document(
        self,
        db: Session,
        document_id: str,
        current_user: User
    ) -> None:

        document = (
            document_repository
            .get_deleted_by_id(

                db,

                document_id

            )
        )

        if document is None:

            raise HTTPException(

                status_code=404,

                detail=(
                    "Deleted document not found."
                )

            )

        document_group_id = (
            document.document_group_id
        )

        versions = (
            document_repository
            .get_versions_by_group_id(

                db,

                document_group_id

            )
        )

        details = {

            "document_group_id": (
                document_group_id
            ),

            "filename": (
                document.original_filename
            ),

            "department": (
                document.department
            ),

            "version_count": (
                len(versions)
            ),

            "deleted_document_ids": [

                version.document_id

                for version in versions

            ]

        }

        for version in versions:

            chroma_service.delete_by_document_id(

                version.document_id

            )

        for version in versions:

            try:

                if os.path.exists(
                    version.file_path
                ):

                    os.remove(
                        version.file_path
                    )

            except Exception:

                pass

        document_repository.permanently_delete_group(

            db,

            document_group_id

        )

        audit_service.log(

            db=db,

            current_user=current_user,

            action=(
                AuditAction
                .DOCUMENT_PERMANENTLY_DELETED
                .value
            ),

            resource_type="DOCUMENT",

            resource_id=(
                document_group_id
            ),

            details=details

        )


document_service = DocumentService()