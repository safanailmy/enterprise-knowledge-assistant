from datetime import datetime

import chromadb

from app.schemas.search_request import (
    SearchRequest
)

from app.schemas.stored_chunk import (
    StoredChunk
)

from app.schemas.retriever_chunk import (
    RetrievedChunk
)

from app.schemas.document_metadata import (
    DocumentMetaData
)


class ChromaService:

    def __init__(self):

        self.client = (
            chromadb.PersistentClient(
                path="chroma"
            )
        )

        self.collection = (
            self.client.get_or_create_collection(
                name="company_documents"
            )
        )

    def store(
        self,
        stored_chunks: list[StoredChunk]
    ):

        ids = []

        documents = []

        embeddings = []

        metadatas = []

        for chunk in stored_chunks:

            ids.append(

                (
                    f"{chunk.metadata.document_id}_"
                    f"{chunk.chunk_index}"
                )

            )

            documents.append(
                chunk.text
            )

            embeddings.append(
                chunk.embedding
            )

            metadatas.append(

                {

                    "document_id": (
                        chunk.metadata.document_id
                    ),

                    "document_group_id": (
                        chunk.metadata.document_group_id
                    ),

                    "filename": (
                        chunk.metadata.filename
                    ),

                    "department": (
                        chunk.metadata.department
                    ),

                    "uploaded_by": (
                        chunk.metadata.uploaded_by
                    ),

                    "upload_date": (
                        chunk.metadata
                        .upload_date
                        .isoformat()
                    ),

                    "version": (
                        chunk.metadata.version
                    ),

                    "chunk_index": (
                        chunk.chunk_index
                    ),

                    "page_number": (
                        chunk.page_number
                    )

                }

            )

        self.collection.add(

            ids=ids,

            documents=documents,

            embeddings=embeddings,

            metadatas=metadatas

        )

        return {

            "stored_chunks": len(
                stored_chunks
            )

        }

    def delete_by_document_id(
        self,
        document_id: str
    ) -> None:

        self.collection.delete(

            where={
                "document_id": document_id
            }

        )

    def search(
        self,
        search_request: SearchRequest
    ) -> list[RetrievedChunk]:

        conditions = []

        if (
            search_request.department
            is not None
        ):

            conditions.append(

                {
                    "department":
                    search_request.department
                }

            )

        if (
            search_request.uploaded_by
            is not None
        ):

            conditions.append(

                {
                    "uploaded_by":
                    search_request.uploaded_by
                }

            )

        if (
            search_request.version
            is not None
        ):

            conditions.append(

                {
                    "version":
                    search_request.version
                }

            )

        if (
            search_request.status
            is not None
        ):

            conditions.append(

                {
                    "status":
                    search_request.status
                }

            )

        if len(conditions) == 0:

            where_filter = None

        elif len(conditions) == 1:

            where_filter = (
                conditions[0]
            )

        else:

            where_filter = {

                "$and": conditions

            }

        results = self.collection.query(

            query_embeddings=[
                search_request.embedding
            ],

            n_results=(
                search_request.top_k
            ),

            where=where_filter,

            include=[
                "documents",
                "metadatas"
            ]

        )

        if (
            not results["documents"]
            or
            not results["documents"][0]
        ):

            return []

        retrieved_chunks = []

        for text, metadata in zip(

            results["documents"][0],

            results["metadatas"][0]

        ):

            document_group_id = (
                metadata.get(
                    "document_group_id",
                    metadata["document_id"]
                )
            )

            retrieved_chunk = (
                RetrievedChunk(

                    text=text,

                    chunk_index=(
                        metadata["chunk_index"]
                    ),

                    page_number=(
                        metadata.get(
                            "page_number"
                        )
                    ),

                    metadata=DocumentMetaData(

                        document_id=(
                            metadata["document_id"]
                        ),

                        document_group_id=(
                            document_group_id
                        ),

                        filename=(
                            metadata["filename"]
                        ),

                        department=(
                            metadata["department"]
                        ),

                        uploaded_by=(
                            metadata["uploaded_by"]
                        ),

                        upload_date=(
                            datetime.fromisoformat(
                                metadata[
                                    "upload_date"
                                ]
                            )
                        ),

                        version=int(
                            metadata["version"]
                        )

                    )

                )
            )

            retrieved_chunks.append(
                retrieved_chunk
            )

        return retrieved_chunks


chroma_service = ChromaService()