import sqlite3
from datetime import datetime

def init_db():
    conn = sqlite3.connect('policy_data.db')
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS policies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT,
            text TEXT,
            flags TEXT,
            timestamp TEXT
        )
    ''')
    conn.commit()
    conn.close()

def insert_policy(url, text, flags):
    conn = sqlite3.connect('policy_data.db')
    cur = conn.cursor()
    cur.execute(
        'INSERT INTO policies (url, text, flags, timestamp) VALUES (?, ?, ?, ?)',
        (url, text, str(flags), datetime.utcnow().isoformat())
    )
    conn.commit()
    conn.close()
