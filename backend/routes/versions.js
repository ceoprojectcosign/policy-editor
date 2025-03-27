const express = require('express')
const versionStore = require('../utils/versionStore')

const router = express.Router()

router.post('/versions/:docId', (req, res) => {
  const { docId } = req.params
  const { content, timestamp } = req.body

  if (!docId || !content || !timestamp) {
    return res.status(400).json({ error: 'Missing data' })
  }

  versionStore.saveVersion(docId, content, timestamp)
  res.json({ versions: versionStore.getVersions(docId) })
})

router.get('/versions/:docId', (req, res) => {
  const { docId } = req.params
  res.json({ versions: versionStore.getVersions(docId) })
})

module.exports = router
