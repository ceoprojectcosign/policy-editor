import { useEffect, useState } from 'react'

export const useVersionHistory = (docId) => {
  const key = `version-history-${docId}`
  const [versions, setVersions] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : []
  })

  const saveVersion = (content) => {
    const timestamp = new Date().toISOString()
    const newVersions = [...versions, { timestamp, content }]
    setVersions(newVersions)
    localStorage.setItem(key, JSON.stringify(newVersions))
  }

  const restoreVersion = (content, editor) => {
    editor?.commands.setContent(content)
  }

  return { versions, saveVersion, restoreVersion }
}
