from app.core.settings import settings

class ChunkingService:
    def chunk (
            self,
            text: str
    )->list[str]:
        """
        Split text into overlapping chunks
        """
        chunk_size = settings.CHUNK_SIZE
        overlap = settings.CHUNK_OVERLAP

        chunks = []

        start = 0

        while start < len(text):

            chunk = text[start:start + chunk_size]

            chunks.append(chunk)

            start += chunk_size - overlap

        return chunks

chunking_service = ChunkingService()