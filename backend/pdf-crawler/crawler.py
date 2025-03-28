# Finds PDF links on a school district page
import requests
from bs4 import BeautifulSoup

def find_pdfs_from_url(url):
    try:
        res = requests.get(url, timeout=10)
        soup = BeautifulSoup(res.text, 'html.parser')
        links = []

        for a in soup.find_all('a', href=True):
            href = a['href']
            if href.endswith('.pdf'):
                # Normalize relative URLs
                full_url = href if href.startswith('http') else url.rstrip('/') + '/' + href.lstrip('/')
                links.append(full_url)

        return links
    except Exception as e:
        print(f"❌ Error scraping {url}: {e}")
        return []
