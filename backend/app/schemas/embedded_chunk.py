from pydantic import BaseModel


class EmbeddedChunk(BaseModel):
    text: str
    embedding: list[float]