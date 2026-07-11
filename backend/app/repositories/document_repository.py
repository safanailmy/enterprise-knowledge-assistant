from sqlalchemy import func

from sqlalchemy.orm import Session

from app.enums.document_status import (
    DocumentStatus
)

from app.models.document import Document


class DocumentRepository:

    def save(
        self,
        db: Session,
        document: Document
    ) -> Document:

        try:

            db.add(
                document
            )

            db.commit()

            db.refresh(
                document
            )

            return document

        except Exception:

            db.rollback()

            raise

    def get_by_id(
        self,
        db: Session,
        document_id: str
    ) -> Document | None:

        return (

            db.query(Document)

            .filter(

                Document.document_id
                == document_id,

                Document.is_deleted
                == False

            )

            .first()

        )

    def get_by_id_including_deleted(
        self,
        db: Session,
        document_id: str
    ) -> Document | None:

        return (

            db.query(Document)

            .filter(

                Document.document_id
                == document_id

            )

            .first()

        )

    def get_deleted_by_id(
        self,
        db: Session,
        document_id: str
    ) -> Document | None:

        return (

            db.query(Document)

            .filter(

                Document.document_id
                == document_id,

                Document.is_deleted
                == True

            )

            .first()

        )

    def get_latest_by_group_id(
        self,
        db: Session,
        document_group_id: str
    ) -> Document | None:

        return (

            db.query(Document)

            .filter(

                Document.document_group_id
                == document_group_id,

                Document.is_deleted
                == False

            )

            .order_by(
                Document.version.desc()
            )

            .first()

        )

    def get_latest_including_deleted(
        self,
        db: Session,
        document_group_id: str
    ) -> Document | None:

        return (

            db.query(Document)

            .filter(

                Document.document_group_id
                == document_group_id

            )

            .order_by(
                Document.version.desc()
            )

            .first()

        )

    def get_versions_by_group_id(
        self,
        db: Session,
        document_group_id: str
    ) -> list[Document]:

        return (

            db.query(Document)

            .filter(

                Document.document_group_id
                == document_group_id

            )

            .order_by(
                Document.version.desc()
            )

            .all()

        )

    def get_all_latest(
        self,
        db: Session
    ) -> list[Document]:

        latest_versions = (

            db.query(

                Document.document_group_id.label(
                    "document_group_id"
                ),

                func.max(
                    Document.version
                ).label(
                    "latest_version"
                )

            )

            .filter(
                Document.is_deleted == False
            )

            .group_by(
                Document.document_group_id
            )

            .subquery()

        )

        return (

            db.query(Document)

            .join(

                latest_versions,

                (

                    Document.document_group_id
                    ==
                    latest_versions.c
                    .document_group_id

                )

                &

                (

                    Document.version
                    ==
                    latest_versions.c
                    .latest_version

                )

            )

            .filter(
                Document.is_deleted == False
            )

            .all()

        )

    def get_all_latest_by_department(
        self,
        db: Session,
        department: str
    ) -> list[Document]:

        latest_versions = (

            db.query(

                Document.document_group_id.label(
                    "document_group_id"
                ),

                func.max(
                    Document.version
                ).label(
                    "latest_version"
                )

            )

            .filter(

                Document.is_deleted
                == False,

                Document.department
                == department

            )

            .group_by(
                Document.document_group_id
            )

            .subquery()

        )

        return (

            db.query(Document)

            .join(

                latest_versions,

                (

                    Document.document_group_id
                    ==
                    latest_versions.c
                    .document_group_id

                )

                &

                (

                    Document.version
                    ==
                    latest_versions.c
                    .latest_version

                )

            )

            .filter(

                Document.is_deleted
                == False,

                Document.department
                == department

            )

            .all()

        )

    def get_all_deleted_latest(
        self,
        db: Session
    ) -> list[Document]:

        latest_versions = (

            db.query(

                Document.document_group_id.label(
                    "document_group_id"
                ),

                func.max(
                    Document.version
                ).label(
                    "latest_version"
                )

            )

            .filter(
                Document.is_deleted == True
            )

            .group_by(
                Document.document_group_id
            )

            .subquery()

        )

        return (

            db.query(Document)

            .join(

                latest_versions,

                (

                    Document.document_group_id
                    ==
                    latest_versions.c
                    .document_group_id

                )

                &

                (

                    Document.version
                    ==
                    latest_versions.c
                    .latest_version

                )

            )

            .filter(
                Document.is_deleted == True
            )

            .all()

        )

    def get_next_version_number(
        self,
        db: Session,
        document_group_id: str
    ) -> int:

        latest_version = (

            db.query(
                func.max(
                    Document.version
                )
            )

            .filter(

                Document.document_group_id
                == document_group_id

            )

            .scalar()

        )

        if latest_version is None:

            return 1

        return latest_version + 1

    def get_active_ready_latest_ids(
        self,
        db: Session,
        document_ids: list[str]
    ) -> set[str]:

        if not document_ids:

            return set()

        candidate_documents = (

            db.query(Document)

            .filter(

                Document.document_id.in_(
                    document_ids
                ),

                Document.is_deleted
                == False,

                Document.status
                == DocumentStatus.READY.value

            )

            .all()

        )

        valid_ids = set()

        for document in candidate_documents:

            latest_document = (
                self.get_latest_by_group_id(

                    db,

                    document.document_group_id

                )
            )

            if (
                latest_document is not None
                and
                latest_document.document_id
                == document.document_id
                and
                latest_document.status
                == DocumentStatus.READY.value
            ):

                valid_ids.add(
                    document.document_id
                )

        return valid_ids
    

    def search_latest_documents(
        self,
        db: Session,
        query: str | None = None,
        department: str | None = None,
        uploaded_by: str | None = None,
        status: str | None = None,
        page: int = 1,
        page_size: int = 20,
        sort_by: str = "upload_date",
        sort_order: str = "desc"
    ) -> tuple[list[Document], int]:

        latest_versions = (

            db.query(

                Document.document_group_id.label(
                    "document_group_id"
                ),

                func.max(
                    Document.version
                ).label(
                    "latest_version"
                )

            )

            .filter(
                Document.is_deleted == False
            )

            .group_by(
                Document.document_group_id
            )

            .subquery()

        )

        documents_query = (

            db.query(Document)

            .join(

                latest_versions,

                (
                    Document.document_group_id
                    ==
                    latest_versions.c.document_group_id
                )

                &

                (
                    Document.version
                    ==
                    latest_versions.c.latest_version
                )

            )

            .filter(
                Document.is_deleted == False
            )

        )

        if query:

            documents_query = (
                documents_query.filter(

                    Document.original_filename.ilike(
                        f"%{query}%"
                    )

                )
            )

        if department:

            documents_query = (
                documents_query.filter(

                    Document.department
                    == department

                )
            )

        if uploaded_by:

            documents_query = (
                documents_query.filter(

                    Document.uploaded_by.ilike(
                        f"%{uploaded_by}%"
                    )

                )
            )

        if status:

            documents_query = (
                documents_query.filter(

                    Document.status
                    == status

                )
            )

        total = documents_query.count()

        sort_columns = {

            "upload_date":
            Document.upload_date,

            "filename":
            Document.original_filename,

            "version":
            Document.version

        }

        sort_column = sort_columns.get(

            sort_by,

            Document.upload_date

        )

        if sort_order == "asc":

            documents_query = (
                documents_query.order_by(
                    sort_column.asc()
                )
            )

        else:

            documents_query = (
                documents_query.order_by(
                    sort_column.desc()
                )
            )

        offset = (
            page - 1
        ) * page_size

        documents = (

            documents_query

            .offset(
                offset
            )

            .limit(
                page_size
            )

            .all()

        )

        return documents, total

    def update(
        self,
        db: Session,
        document: Document
    ) -> Document:

        try:

            db.commit()

            db.refresh(
                document
            )

            return document

        except Exception:

            db.rollback()

            raise

    def update_status(
        self,
        db: Session,
        document_id: str,
        status: str
    ) -> None:

        document = self.get_by_id(
            db,
            document_id
        )

        if document is None:

            return

        document.status = status

        self.update(
            db,
            document
        )

    def soft_delete_group(
        self,
        db: Session,
        document_group_id: str
    ) -> None:

        try:

            (

                db.query(Document)

                .filter(

                    Document.document_group_id
                    == document_group_id

                )

                .update(

                    {
                        Document.is_deleted:
                        True
                    },

                    synchronize_session=False

                )

            )

            db.commit()

        except Exception:

            db.rollback()

            raise

    def restore_group(
        self,
        db: Session,
        document_group_id: str
    ) -> None:

        try:

            (

                db.query(Document)

                .filter(

                    Document.document_group_id
                    == document_group_id

                )

                .update(

                    {
                        Document.is_deleted:
                        False
                    },

                    synchronize_session=False

                )

            )

            db.commit()

        except Exception:

            db.rollback()

            raise

    def permanently_delete_group(
        self,
        db: Session,
        document_group_id: str
    ) -> None:

        try:

            (

                db.query(Document)

                .filter(

                    Document.document_group_id
                    == document_group_id

                )

                .delete(
                    synchronize_session=False
                )

            )

            db.commit()

        except Exception:

            db.rollback()

            raise


document_repository = DocumentRepository()