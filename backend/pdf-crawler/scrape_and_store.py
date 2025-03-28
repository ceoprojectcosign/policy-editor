import os
import json
from urllib.parse import urlparse
from crawler import find_pdfs_from_url
from fetcher import extract_text_from_pdf

OUTPUT_FILE = "../policy_records.json"

def extract_district_name(url):
    domain = urlparse(url).netloc
    return domain.replace("www.", "").split(".")[0]  # crude, customize if needed

def run_scraper():
    records = []

    with open("../districts.txt", "r") as f:
        district_urls = [line.strip() for line in f.readlines()]

    for district_url in district_urls:
        district_name = extract_district_name(district_url)
        print(f"\n🏫 Scanning {district_name}: {district_url}")
        pdf_links = find_pdfs_from_url(district_url)

        for pdf_url in pdf_links:
            try:
                print(f"📄 Found PDF: {pdf_url}")
                text = extract_text_from_pdf(pdf_url)

                record = {
                    "district": district_name,
                    "url": pdf_url,
                    "text": text
                }
                records.append(record)

                # Optional: save raw PDF
                os.makedirs("../storage", exist_ok=True)
                filename = pdf_url.split("/")[-1]
                filepath = f"../storage/{district_name}__{filename}"
                with open(filepath, "wb") as f:
                    f.write(requests.get(pdf_url).content)

            except Exception as e:
                print(f"❌ Failed to process {pdf_url}: {e}")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(records, f, indent=2)

    print(f"\n✅ Done! Saved {len(records)} records to {OUTPUT_FILE}")
