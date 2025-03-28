# Affiliate Backend + PDF Intelligence

## Setup
1. Clone repo
2. Install backend deps:
```bash
npm install
```
3. Start the Node server:
```bash
npm start
```
4. For PDF analysis tools:
```bash
pip install -r requirements.txt
```

## Environment Variables
Create a `.env` file with:
```env
MONGODB_URI=mongodb://localhost:27017/affiliate_db
PORT=4000
```

---

## File Purposes
- `server.js` — Node backend
- `app.py` — Optional Python API for scraping/PDF logic
- `__init__.py` — Makes PDF module importable
- `storage/` — Local directory for storing raw PDFs

---

## To Run PDF Analysis:
Use `scheduler.py` (in your crawler module) to scan districts and extract PDF data.
