from pathlib import Path

from app.services.extraction.pdf_extractor import (
    pdf_extractor
)


class TextExtractor:

    def extract(
        self,
        file_path: Path
    ) -> list[dict]:

        extension = (
            Path(file_path)
            .suffix
            .lower()
        )

        if extension == ".pdf":

            return pdf_extractor.extract(
                file_path
            )

        raise ValueError(

            f"Unsupported file type: "
            f"{extension}"

        )


text_extractor = TextExtractor()