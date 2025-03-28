# Flags keywords or controversial terms
KEYWORDS = ['gender', 'bathroom', 'library', 'book ban', 'CRT']

def extract_flags(text):
    text = text.lower()
    return {kw: kw in text for kw in KEYWORDS}
