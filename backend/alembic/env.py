from logging.config import fileConfig

from alembic import context

from sqlalchemy import create_engine
from sqlalchemy import pool

from app.core.database import Base

from app.core.settings import settings

import app.models.user
import app.models.document
import app.models.audit_log
import app.models.conversation
import app.models.message

config = context.config


if config.config_file_name is not None:

    fileConfig(
        config.config_file_name
    )


target_metadata = Base.metadata


def run_migrations_offline() -> None:

    url = config.get_main_option(
        "sqlalchemy.url"
    )

    context.configure(

        url=url,

        target_metadata=target_metadata,

        literal_binds=True,

        dialect_opts={
            "paramstyle": "named"
        },

        compare_type=True

    )

    with context.begin_transaction():

        context.run_migrations()


def run_migrations_online() -> None:

    connectable = create_engine(

        settings.DATABASE_URL,

        poolclass=pool.NullPool

    )

    with connectable.connect() as connection:

        context.configure(

            connection=connection,

            target_metadata=target_metadata,

            compare_type=True

        )

        with context.begin_transaction():

            context.run_migrations()


if context.is_offline_mode():

    run_migrations_offline()

else:

    run_migrations_online()