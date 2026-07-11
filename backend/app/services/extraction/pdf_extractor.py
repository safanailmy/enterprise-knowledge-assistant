from pathlib import Path

import fitz


class PDFExtractor:

    def extract(
        self,
        file_path: Path
    ) -> list[dict]:

        document = fitz.open(
            file_path
        )

        pages = []

        try:

            for page_index, page in enumerate(
                document
            ):

                text = page.get_text()

                if not text.strip():

                    continue

                pages.append(

                    {

                        "page_number": (
                            page_index + 1
                        ),

                        "text": text

                    }

                )

        finally:

            document.close()

        return pages


pdf_extractor = PDFExtractor()