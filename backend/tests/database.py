from sqlalchemy import create_engine

from sqlalchemy.orm import sessionmaker

from sqlalchemy.orm import DeclarativeBase


DATABASE_URL = (

    "postgresql://postgres:YOUR_PASSWORD"

    "@localhost:5432/"

    "enterprise_knowledge_assistant_test"

)


class TestBase(DeclarativeBase):

    pass


engine = create_engine(

    DATABASE_URL,

    echo=False

)


TestingSessionLocal = sessionmaker(

    autocommit=False,

    autoflush=False,

    bind=engine

)