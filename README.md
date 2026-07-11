# Enterprise Knowledge Assistant

A production style, multi user AI knowledge platform that transforms organizational documents into secure, searchable knowledge using Retrieval Augmented Generation (RAG).

## Highlights

- Enterprise Retrieval-Augmented Generation (RAG)
- Secure JWT Authentication & RBAC
- Multi user Conversation Memory
- Document Version Control
- Semantic Search with ChromaDB
- Google Gemini Integration
- Admin Analytics Dashboard
- Audit Logging
- Enterprise Search
- 24 Automated Integration Tests

## Project Overview
Enterprise Knowledge Assistant is designed to solve a common organizational problem: important knowledge is often scattered across internal documents and difficult to retrieve quickly.

The platform combines document management, semantic search, and generative AI to allow users to ask questions about organizational documents and receive answers grounded only in authorized content.

The system currently supports PDF documents and includes:

- Secure authentication and role based authorization
- Department level document access control
- PDF ingestion and text extraction
- Page aware document chunking
- Semantic search using vector embeddings
- Retrieval Augmented Generation (RAG)
- Context grounded AI answers
- Page level source citations
- Multi turn conversational memory
- Persistent conversation history
- Document version management and rollback
- Recycle Bin and document restoration
- Secure permanent deletion
- Audit logging
- Document search, filtering, pagination, and sorting
- Secure document downloads
- Admin analytics dashboard
- Automated integration testing

## Current features
### Authentication and Authorization
- User registration and login
- JWT based authentication
- Admin and regular user roles
- Department based access control
- Protected API endpoints
- Role based administrative operations

### Enterprise Document Management
- Secure PDF upload
- Department assignment
- PostgreSQL document metadata storage
- Unique document and document-group identifiers
- Document processing status tracking
- Latest version document listing
- Department restricted document access
- Secure document download

### Document Version Control
- Upload new versions of existing documents
- Maintain complete version history
- Automatically use only the latest active version for RAG
- Roll back to a previous version
- Create a new version from rollback content
- Preserve previous versions for historical tracking

### Document Lifecycle Management
- Soft delete complete document families
- Recycle Bin
- Restore deleted document families
- Permanently delete all versions
- Remove physical files during permanent deletion
- Remove associated ChromaDB vectors
- Remove PostgreSQL records

### Retrieval Augmented Generation (RAG)
- PDF text extraction
- Page-aware document processing
- Overlapping text chunking
- SentenceTransformer embeddings
- ChromaDB vector storage
- Semantic similarity search
- Retrieval candidate filtering
- Duplicate chunk removal
- Latest active document version validation
- Department aware retrieval
- Gemini powered answer generation
- Strict document grounded prompting

### Page-Aware Source Citations
Every RAG source can include:
- Document ID
- Filename
- Document version
- PDF page number
- Chunk index

This allows users to trace AI generated answers back to the relevant source document and page.

### Conversations and Chat History
- Create conversations
- Rename conversations
- List user conversations
- View complete conversation history
- Delete conversations
- Store user messages
- Store assistant responses
- Store RAG sources with assistant messages
- Maintain persistent PostgreSQL backed chat history

### Context-Aware Follow-Up Questions
The system supports multi-turn conversations.

For example:
User: What is the maternity leave policy?
User: How long is it?

The system uses recent conversation history to rewrite follow up questions into standalone retrieval queries while preserving the original question for the final answer.

### Document Discovery
- Case insensitive filename search
- Department filtering
- Uploader filtering
- Document status filtering
- Pagination
- Total result count
- Total page count
- Sorting by upload date
- Sorting by filename
- Sorting by version
- Ascending and descending ordering

### Admin Analytics Dashboard

The platform provides enterprise level analytics for administrators, including:

- System overview statistics
- User statistics
- Active user counts
- Documents by department
- Documents by status
- Recent uploads
- Chat usage statistics
- Most queried documents
- Recent chat queries
- Recent audit activity

Access is restricted to administrators only.

### Automated Testing

The backend includes automated integration tests built with Pytest.

Current test coverage includes:

- Health endpoint
- Authentication
- User APIs
- Conversation APIs
- Document APIs
- Chat APIs
- Authorization
- Error handling

Mocked LLM responses are used to ensure deterministic AI testing without external API calls.

### Audit Logging

The system records important user and document activities, including:
- Document uploads
- New document versions
- Document rollbacks
- Soft deletions
- Document restorations
- Permanent deletions
- Chat queries

Audit records include:
- User ID
- User email
- Action
- Resource type
- Resource ID
- Contextual action details
- Timestamp

## RAG Architecture
![RAG Architecture](images\RAG-Architecture.png)

## Document Version Architecture
![Document Versioning](images\document-version.png)

A rollback does not overwrite document history. Instead, the selected historical version is copied into a new latest version.

Example:

V1 → Original document 
V2 → Updated document 
V3 → Rollback copy of V1 

RAG uses only V3 because it is the latest active version.

## Security Model
![Security Model](images\security-model.png)

The RAG pipeline also validates retrieved document IDs against PostgreSQL before sending context to the language model. This prevents deleted, outdated, unauthorized, or non latest document versions from being used in answers.

## REST API
- Current backend includes secure REST APIs for:
- Authentication
- User Management
- Document Management
- Version Control
- Enterprise Search
- Conversations
- Chat (RAG)
- Analytics
- Audit Logs

## Technology Stack
Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Alembic

Database
- PostgreSQL

AI and RAG
- Google Gemini API
- SentenceTransformers
- ChromaDB
- PyMuPDF

Authentication and Security
- JWT authentication
- Role based access control
- Department based authorization

Testing
- Pytest
- pytest mock
- FastAPI TestClient

Frontend
Planned:
- React
- Tailwind CSS

## Project Structure
![Project Structure](images\project-structure.png)

## Future Multi-Format Knowledge Support

The ingestion architecture is designed to be extended beyond PDFs.

PDF
    → Page aware extraction

Word
    → Document and section extraction

PowerPoint
    → Slide aware extraction

Excel
    → Sheet and cell range extraction

Images
    → OCR and visual text extraction

This will allow the platform to build a unified organizational knowledge base from multiple enterprise content formats.

## Testing
Run all automated tests:

```python
pytest
```

Current Status
24 Passed
0 Failed

Tests Include
- Authentication
- Authorization
- Health
- Users
- Conversations
- Documents
- Chat