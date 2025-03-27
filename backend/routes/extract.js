const express = require('express')
const router = express.Router()
const pdfParse = require('pdf-parse')
const fetch = require('node-fetch')

router.post('/extract-draft', async (req, res) => {
  const { pdfUrl } = req.body
  if (!pdfUrl) return res.status(400).json({ error: 'Missing PDF URL' })

  try {
    const response = await fetch(pdfUrl)
    const buffer = await response.buffer()
    const data = await pdfParse(buffer)

    const draft = data.text
      .replace(/\r\n|\r/g, '\n')
      .replace(/\n{2,}/g, '\n\n')
      .replace(/[^\S\r\n]{2,}/g, ' ')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 40)
      .join('\n\n')

    res.json({ draft })
  } catch (err) {
    console.error('PDF parse error:', err)
    res.status(500).json({ error: 'Failed to parse PDF' })
  }
})

module.exports = router
