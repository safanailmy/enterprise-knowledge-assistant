from sqlalchemy.orm import Session

from app.models.message import Message


class MessageRepository:

    def save(
        self,
        db: Session,
        message: Message
    ) -> Message:

        try:
            db.add(message)
            db.commit()
            db.refresh(message)

            return message

        except Exception:
            db.rollback()
            raise

    def get_by_id(
        self,
        db: Session,
        message_id: str
    ) -> Message | None:

        return (
            db.query(Message)
            .filter(Message.message_id == message_id)
            .first()
        )

    def get_all_by_conversation(
        self,
        db: Session,
        conversation_id: str
    ) -> list[Message]:

        return (
            db.query(Message)
            .filter(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.asc())
            .all()
        )

    def delete_by_conversation(
        self,
        db: Session,
        conversation_id: str
    ) -> None:

        try:
            (
                db.query(Message)
                .filter(Message.conversation_id == conversation_id)
                .delete(synchronize_session=False)
            )

            db.commit()

        except Exception:
            db.rollback()
            raise

    def get_recent_by_conversation(
        self,
        db: Session,
        conversation_id: str,
        limit: int = 10
    ) -> list[Message]:

        messages = (
            db.query(Message)
            .filter(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.desc())
            .limit(limit)
            .all()
        )

        return list(reversed(messages))

    def delete(
        self,
        db: Session,
        message: Message
    ) -> None:

        try:

            db.delete(
                message
            )

            db.commit()

        except Exception:

            db.rollback()

            raise

message_repository = MessageRepository()