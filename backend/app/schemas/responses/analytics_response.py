from datetime import datetime

from pydantic import BaseModel


class CountByName(BaseModel):

    name: str

    count: int


class RecentUploadItem(BaseModel):

    document_id: str

    document_group_id: str

    filename: str

    department: str

    uploaded_by: str

    version: int

    status: str

    upload_date: datetime


class RecentQueryItem(BaseModel):

    user_email: str

    question: str

    department: str | None

    retrieved_chunk_count: int

    created_at: datetime


class PopularDocumentItem(BaseModel):

    document_id: str | None

    filename: str

    usage_count: int


class RecentActivityItem(BaseModel):

    audit_id: str

    user_email: str

    action: str

    resource_type: str

    resource_id: str | None

    created_at: datetime


class OverviewAnalytics(BaseModel):

    total_users: int

    active_users: int

    total_documents: int

    total_document_versions: int

    total_conversations: int

    total_messages: int

    total_chat_queries: int


class DocumentAnalytics(BaseModel):

    by_department: list[CountByName]

    by_status: list[CountByName]

    recent_uploads: list[RecentUploadItem]


class ChatAnalytics(BaseModel):

    queries_by_department: list[CountByName]

    most_used_documents: list[PopularDocumentItem]

    recent_queries: list[RecentQueryItem]


class UserAnalytics(BaseModel):

    by_role: list[CountByName]

    by_department: list[CountByName]


class AnalyticsDashboardResponse(BaseModel):

    overview: OverviewAnalytics

    documents: DocumentAnalytics

    chat: ChatAnalytics

    users: UserAnalytics

    recent_activity: list[RecentActivityItem]