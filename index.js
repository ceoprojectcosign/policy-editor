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

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`)
})
