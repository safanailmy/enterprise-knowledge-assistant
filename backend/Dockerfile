FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip

# ----------------------------
# Core backend dependencies
# ----------------------------
RUN pip install --default-timeout=1000 \
    fastapi \
    uvicorn \
    python-dotenv \
    pydantic-settings \
    python-multipart \
    email-validator \
    sqlalchemy \
    psycopg2-binary \
    alembic \
    python-jose[cryptography] \
    pwdlib[argon2]

# ----------------------------
# PDF Processing
# ----------------------------
RUN pip install --default-timeout=1000 PyMuPDF

# ----------------------------
# Google Gemini
# ----------------------------
RUN pip install --default-timeout=1000 google-genai

# ----------------------------
# CPU-only PyTorch
# ----------------------------
RUN pip install --default-timeout=1000 \
    torch torchvision torchaudio \
    --index-url https://download.pytorch.org/whl/cpu

# ----------------------------
# AI / RAG
# ----------------------------
RUN pip install --default-timeout=1000 \
    sentence-transformers \
    chromadb

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]