const express = require('express')
const fetch = require('node-fetch')

const router = express.Router()

router.post('/ai/summarize', async (req, res) => {
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

module.exports = router
