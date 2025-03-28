# Finds PDF links on a school district page
import requests
from bs4 import BeautifulSoup

def find_pdfs_from_url(url):
    res = requests.get(url, timeout=10)
    soup = BeautifulSoup(res.text, 'html.parser')
    return [a['href'] for a in soup.find_all('a', href=True) if a['href'].endswith('.pdf')]
