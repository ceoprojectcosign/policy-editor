// services/api.js
const BASE_URL = import.meta.env.VITE_BACKEND_URL

export async function extractDraftFromPdf(pdfUrl) {
  const res = await fetch(`${BASE_URL}/api/extract-draft`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pdfUrl }),
  })
  if (!res.ok) throw new Error('Failed to extract draft')
  return res.json()
}
