from pathlib import Path
from fastapi import UploadFile

class DocumentService:
    UPLOAD_DIR = Path("uploads")

    def save_document(
        self,
        file: UploadFile
    ):

        self.UPLOAD_DIR.mkdir(
            exist_ok=True
        )

        file_path = (
            self.UPLOAD_DIR / file.filename
        )

        with open(
            file_path,
            "wb"
        ) as buffer:

            buffer.write(
                file.file.read()
            )

        return {
            "filename": file.filename,
            "path": str(file_path)
        }


document_service = DocumentService()