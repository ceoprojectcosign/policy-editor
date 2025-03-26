const express = require('express')
const cors = require('cors')
const pdfParse = require('pdf-parse')
const fetch = require('node-fetch')

const app = express()
const PORT = process.env.PORT || 3002

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend is live ✅')
})

app.post('/api/extract-draft', async (req, res) => {
  const { pdfUrl } = req.body
  if (!pdfUrl) return res.status(400).json({ error: 'Missing PDF URL' })

  try {
    const response = await fetch(pdfUrl)
    const buffer = await response.buffer()
    const data = await pdfParse(buffer)

    // 🧼 Clean up formatting
    let draft = data.text
      .replace(/\r\n|\r/g, '\n')                    // normalize line endings
      .replace(/\n{2,}/g, '\n\n')                   // collapse multiple blank lines
      .replace(/[^\S\r\n]{2,}/g, ' ')               // collapse weird extra spaces
      .split('\n')                                  // split into lines
      .map(line => line.trim())                     // trim each line
      .filter(line => line.length > 0)              // remove empty lines
      .slice(0, 40)                                  // limit preview
      .join('\n\n')                                 // rejoin with proper spacing

    res.json({ draft })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to parse PDF' })
  }
})

app.post('/api/ai/summarize', async (req, res) => {
  const { prompt } = req.body
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' })

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        prompt: `Summarize the following policy:\n\n${prompt}`,
        stream: false
      }),
    })
    const result = await response.json()
    res.json({ summary: result.response })
  } catch (err) {
    console.error('AI error:', err)
    res.status(500).json({ error: 'AI request failed' })
  }
})

const versionStore = {}

app.post('/api/versions/:docId', (req, res) => {
  const { docId } = req.params
  const { content, timestamp } = req.body

  if (!docId || !content || !timestamp) {
    return res.status(400).json({ error: 'Missing data' })
  }

  if (!versionStore[docId]) versionStore[docId] = []
  versionStore[docId].push({ content, timestamp })

  res.json({ versions: versionStore[docId] })
})

app.get('/api/versions/:docId', (req, res) => {
  const { docId } = req.params
  res.json({ versions: versionStore[docId] || [] })
})

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`)
})