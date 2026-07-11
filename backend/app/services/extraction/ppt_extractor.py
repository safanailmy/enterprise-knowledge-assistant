import fitz


class PDFExtractor:

    def extract(self, file_path: str) -> str:
        """
        Extract text from a PDF file.
        """

        document = fitz.open(file_path)

        full_text = ""

        for page in document:
            full_text += page.get_text()

        document.close()

        return full_text


pdf_extractor = PDFExtractor()