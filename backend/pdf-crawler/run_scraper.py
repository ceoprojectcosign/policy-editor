from pdf_crawler.crawler import find_pdfs_from_url
from pdf_crawler.fetcher import extract_text_from_pdf
from pdf_crawler.extractor import extract_flags
from pdf_crawler.db import insert_policy, init_db

def run():
    init_db()
    with open("../districts.txt", "r") as f:
        urls = [line.strip() for line in f.readlines()]

    for district_url in urls:
        print(f"\n🔍 Scanning: {district_url}")
        pdf_links = find_pdfs_from_url(district_url)
        for link in pdf_links:
            print(f"📄 Found PDF: {link}")
            try:
                text = extract_text_from_pdf(link)
                flags = extract_flags(text)
                insert_policy(link, text, flags)
                print(f"✅ Stored: {link}")
            except Exception as e:
                print(f"❌ Failed to process {link}: {e}")

if __name__ == "__main__":
    run()
