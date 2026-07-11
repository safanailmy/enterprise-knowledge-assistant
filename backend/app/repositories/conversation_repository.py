from sqlalchemy.orm import Session

from app.models.conversation import (
    Conversation
)


class ConversationRepository:

    def save(
        self,
        db: Session,
        conversation: Conversation
    ) -> Conversation:

        try:

            db.add(
                conversation
            )

            db.commit()

            db.refresh(
                conversation
            )

            return conversation

        except Exception:

            db.rollback()

            raise

    def get_by_id(
        self,
        db: Session,
        conversation_id: str
    ) -> Conversation | None:

        return (

            db.query(
                Conversation
            )

            .filter(
                Conversation.conversation_id
                == conversation_id
            )

            .first()

        )

    def get_by_id_and_user(
        self,
        db: Session,
        conversation_id: str,
        user_id: str
    ) -> Conversation | None:

        return (

            db.query(
                Conversation
            )

            .filter(

                Conversation.conversation_id
                == conversation_id,

                Conversation.user_id
                == user_id

            )

            .first()

        )

    def get_all_by_user(
        self,
        db: Session,
        user_id: str
    ) -> list[Conversation]:

        return (

            db.query(
                Conversation
            )

            .filter(
                Conversation.user_id
                == user_id
            )

            .order_by(
                Conversation.updated_at.desc()
            )

            .all()

        )

    def update(
        self,
        db: Session,
        conversation: Conversation
    ) -> Conversation:

        try:

            db.commit()

            db.refresh(
                conversation
            )

            return conversation

        except Exception:

            db.rollback()

            raise

    def delete(
        self,
        db: Session,
        conversation: Conversation
    ) -> None:

        try:

            db.delete(
                conversation
            )

            db.commit()

        except Exception:

            db.rollback()

            raise


conversation_repository = (
    ConversationRepository()
)