import logging

from sentence_transformers import SentenceTransformer

from app.schemas.embedded_chunk import EmbeddedChunk

logger = logging.getLogger(__name__)


class EmbeddingService:

    def __init__(self):

        self.model = None

    

    def _get_model(self):

        if self.model is None:

            logger.info(
                "Loading embedding model..."
            )

            self.model = SentenceTransformer(
                "all-MiniLM-L6-v2"
            )

            logger.info(
                "Embedding model loaded."
            )

        return self.model

    def embed_documents(
        self,
        chunks: list[str]
    ) -> list[EmbeddedChunk]:

        model = self._get_model()

        vectors = model.encode(chunks)

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

        model = self._get_model()

        vector = model.encode(question)

        return vector.tolist()


embedding_service = EmbeddingService()