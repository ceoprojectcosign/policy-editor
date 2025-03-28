from pdf_crawler.crawler import find_pdfs_from_url
from pdf_crawler.fetcher import extract_text_from_pdf
from pdf_crawler.extractor import extract_flags
from pdf_crawler.db import insert_policy, init_db

# Example target
district_urls = [
    "https://exampledistrict.org/policies"
]

def run_scraper():
    init_db()
    for url in district_urls:
        try:
            pdfs = find_pdfs_from_url(url)
            for pdf_url in pdfs:
                text = extract_text_from_pdf(pdf_url)
                flags = extract_flags(text)
                insert_policy(pdf_url, text, flags)
                print(f"✅ Processed: {pdf_url}")
        except Exception as e:
            print(f"❌ Error processing {url}: {e}")

if __name__ == "__main__":
    run_scraper()
