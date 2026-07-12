"""add document group id

Revision ID: eae36a40293e
Revises: 
Create Date: 2026-07-07 12:31:11.994476

"""
from typing import Sequence
from typing import Union

from alembic import op

import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'eae36a40293e'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:

    op.add_column(

        "documents",

        sa.Column(
            "document_group_id",
            sa.String(),
            nullable=True
        )

    )

    op.execute(

        """
        UPDATE documents
        SET document_group_id = document_id
        WHERE document_group_id IS NULL
        """

    )

    op.alter_column(

        "documents",

        "document_group_id",

        existing_type=sa.String(),

        nullable=False

    )

    op.create_index(

        op.f(
            "ix_documents_document_group_id"
        ),

        "documents",

        [
            "document_group_id"
        ],

        unique=False

    )


def downgrade() -> None:

    op.drop_index(

        op.f(
            "ix_documents_document_group_id"
        ),

        table_name="documents"

    )

    op.drop_column(

        "documents",

        "document_group_id"

    )