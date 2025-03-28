# Downloads and extracts text from PDFs
import pdfplumber
from io import BytesIO
import requests

def extract_text_from_pdf(url):
    res = requests.get(url, timeout=10)
    with pdfplumber.open(BytesIO(res.content)) as pdf:
        return "\n".join([page.extract_text() or "" for page in pdf.pages])
