from pathlib import Path

from app.schemas.document_metadata import (
    DocumentMetaData
)

from app.schemas.stored_chunk import (
    StoredChunk
)

from app.services.extraction.text_extractor import (
    text_extractor
)

from app.services.rag.chunking_service import (
    chunking_service
)

from app.services.rag.embedding_service import (
    embedding_service
)

from app.services.rag.chroma_service import (
    chroma_service
)


class IngestionService:

    def process(
        self,
        file_path: Path,
        metadata: DocumentMetaData
    ):

        extracted_pages = (
            text_extractor.extract(
                file_path
            )
        )

        stored_chunks = []

        chunk_index = 0

        total_characters = 0

        for page in extracted_pages:

            page_number = (
                page["page_number"]
            )

            page_text = (
                page["text"]
            )

            total_characters += len(
                page_text
            )

            chunks = (
                chunking_service.chunk(
                    page_text
                )
            )

            if not chunks:

                continue

            embedded_chunks = (
                embedding_service
                .embed_documents(
                    chunks
                )
            )

            for embedded_chunk in embedded_chunks:

                stored_chunk = StoredChunk(

                    text=(
                        embedded_chunk.text
                    ),

                    embedding=(
                        embedded_chunk.embedding
                    ),

                    chunk_index=(
                        chunk_index
                    ),

                    page_number=(
                        page_number
                    ),

                    metadata=metadata

                )

                stored_chunks.append(
                    stored_chunk
                )

                chunk_index += 1

        chroma_service.store(
            stored_chunks
        )

        return {

            "characters_extracted": (
                total_characters
            ),

            "pages_extracted": (
                len(extracted_pages)
            ),

            "total_chunks": (
                len(stored_chunks)
            ),

            "stored_chunks": (
                len(stored_chunks)
            )

        }


ingestion_service = IngestionService()