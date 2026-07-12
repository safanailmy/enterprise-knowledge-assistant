from sqlalchemy.engine import URL

from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict
)


class Settings(BaseSettings):

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

    PROJECT_NAME: str = "Enterprise Knowledge Assistant"

    VERSION: str = "1.0.0"

    # RAG
    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200

    # Retrieval
    TOP_K_RESULTS: int = 5
    RETRIEVAL_CANDIDATE_MULTIPLIER: int = 3

    # Gemini
    GEMINI_API_KEY: str
    GEMINI_MODEL: str = "gemini-2.5-flash"

    # PostgreSQL
    DATABASE_HOST: str
    DATABASE_PORT: int
    DATABASE_NAME: str
    DATABASE_USER: str
    DATABASE_PASSWORD: str

    # JWT
    SECRET_KEY: str = "your-super-secret-key-change-this"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Chat
    CHAT_HISTORY_MESSAGE_LIMIT: int = 10

    @property
    def DATABASE_URL(self):

        return URL.create(

            drivername="postgresql+psycopg2",

            username=self.DATABASE_USER,

            password=self.DATABASE_PASSWORD,

            host=self.DATABASE_HOST,

            port=self.DATABASE_PORT,

            database=self.DATABASE_NAME

        )


settings = Settings()