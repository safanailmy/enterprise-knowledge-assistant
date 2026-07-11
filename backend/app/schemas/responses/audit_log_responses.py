from datetime import datetime

from pydantic import BaseModel


class AuditLogItem(BaseModel):

    audit_id: str

    user_id: str

    user_email: str

    action: str

    resource_type: str

    resource_id: str | None

    details: dict | None

    created_at: datetime


class AuditLogListResponse(BaseModel):

    audit_logs: list[AuditLogItem]