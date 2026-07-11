from sentence_transformers import SentenceTransformer

from app.schemas.embedded_chunk import EmbeddedChunk


class EmbeddingService:

    def __init__(self):

        self.model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

    def embed_documents(
        self,
        chunks: list[str]
    ) -> list[EmbeddedChunk]:

        vectors = self.model.encode(chunks)

        embedded_chunks = []

        for chunk, vector in zip(chunks, vectors):

            embedded_chunks.append(

                EmbeddedChunk(

                    text=chunk,

                    embedding=vector.tolist()
                )
            )

        return embedded_chunks

    def embed_query(
        self,
        question: str
    ) -> list[float]:

        vector = self.model.encode(question)

        return vector.tolist()


embedding_service = EmbeddingService()