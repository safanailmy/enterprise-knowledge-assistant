from collections import Counter

from sqlalchemy.orm import Session

from app.repositories.analytics_repository import (
    analytics_repository
)

from app.schemas.responses.analytics_response import (
    CountByName,
    RecentUploadItem,
    RecentQueryItem,
    PopularDocumentItem,
    RecentActivityItem,
    OverviewAnalytics,
    DocumentAnalytics,
    ChatAnalytics,
    UserAnalytics,
    AnalyticsDashboardResponse
)


class AnalyticsService:

    def _build_count_items(
        self,
        rows: list[tuple]
    ) -> list[CountByName]:

        return [

            CountByName(
                name=name,
                count=count
            )

            for name, count in rows

        ]

    def get_dashboard(
        self,
        db: Session
    ) -> AnalyticsDashboardResponse:

        overview = OverviewAnalytics(

            total_users=(
                analytics_repository
                .get_total_users(db)
            ),

            active_users=(
                analytics_repository
                .get_active_users(db)
            ),

            total_documents=(
                analytics_repository
                .get_total_documents(db)
            ),

            total_document_versions=(
                analytics_repository
                .get_total_document_versions(db)
            ),

            total_conversations=(
                analytics_repository
                .get_total_conversations(db)
            ),

            total_messages=(
                analytics_repository
                .get_total_messages(db)
            ),

            total_chat_queries=(
                analytics_repository
                .get_total_chat_queries(db)
            )

        )

        recent_documents = (
            analytics_repository
            .get_recent_uploads(
                db=db,
                limit=5
            )
        )

        recent_uploads = [

            RecentUploadItem(

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
                ),

                status=(
                    document.status
                ),

                upload_date=(
                    document.upload_date
                )

            )

            for document in recent_documents

        ]

        documents = DocumentAnalytics(

            by_department=(
                self._build_count_items(

                    analytics_repository
                    .get_documents_by_department(
                        db
                    )

                )
            ),

            by_status=(
                self._build_count_items(

                    analytics_repository
                    .get_documents_by_status(
                        db
                    )

                )
            ),

            recent_uploads=recent_uploads

        )

        chat_logs = (
            analytics_repository
            .get_chat_query_logs(
                db
            )
        )

        department_counter = Counter()

        document_counter = Counter()

        document_names = {}

        for log in chat_logs:

            details = (
                log.details
                or {}
            )

            department = details.get(
                "authorized_department"
            )

            if department:

                department_counter[
                    department
                ] += 1

            query_document_ids = set()

            for source in details.get(
                "sources",
                []
            ):

                document_id = source.get(
                    "document_id"
                )

                filename = source.get(
                    "filename"
                )

                if document_id:

                    document_names[
                        document_id
                    ] = (
                        filename
                        or "Unknown Document"
                    )

                    query_document_ids.add(
                        document_id
                    )


            for document_id in query_document_ids:

                document_counter[
                    document_id
                ] += 1

        queries_by_department = [

            CountByName(
                name=department,
                count=count
            )

            for department, count
            in department_counter
            .most_common()

        ]

        most_used_documents = [

            PopularDocumentItem(

                document_id=document_id,

                filename=(
                    document_names.get(
                        document_id,
                        "Unknown Document"
                    )
                ),

                usage_count=count

            )

            for document_id, count
            in document_counter
            .most_common(5)

        ]

        recent_queries = []

        for log in chat_logs[:5]:

            details = (
                log.details
                or {}
            )

            recent_queries.append(

                RecentQueryItem(

                    user_email=(
                        log.user_email
                    ),

                    question=(
                        details.get(
                            "question",
                            ""
                        )
                    ),

                    department=(
                        details.get(
                            "authorized_department"
                        )
                    ),

                    retrieved_chunk_count=(
                        details.get(
                            "retrieved_chunk_count",
                            0
                        )
                    ),

                    created_at=(
                        log.created_at
                    )

                )

            )

        chat = ChatAnalytics(

            queries_by_department=(
                queries_by_department
            ),

            most_used_documents=(
                most_used_documents
            ),

            recent_queries=(
                recent_queries
            )

        )

        users = UserAnalytics(

            by_role=(
                self._build_count_items(

                    analytics_repository
                    .get_users_by_role(
                        db
                    )

                )
            ),

            by_department=(
                self._build_count_items(

                    analytics_repository
                    .get_users_by_department(
                        db
                    )

                )
            )

        )

        activity_logs = (
            analytics_repository
            .get_recent_activity(

                db=db,

                limit=10

            )
        )

        recent_activity = [

            RecentActivityItem(

                audit_id=(
                    log.audit_id
                ),

                user_email=(
                    log.user_email
                ),

                action=(
                    log.action
                ),

                resource_type=(
                    log.resource_type
                ),

                resource_id=(
                    log.resource_id
                ),

                created_at=(
                    log.created_at
                )

            )

            for log in activity_logs

        ]

        return AnalyticsDashboardResponse(

            overview=overview,

            documents=documents,

            chat=chat,

            users=users,

            recent_activity=recent_activity

        )


analytics_service = AnalyticsService()