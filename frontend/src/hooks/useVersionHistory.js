import { useEffect, useState } from 'react'

export const useVersionHistory = (docId, editor) => {
  const [versions, setVersions] = useState([])
  const BASE_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/versions/${docId}`)
        const data = await res.json()
        setVersions(data.versions || [])
      } catch (err) {
        console.error('Failed to fetch versions:', err)
      }
    }

    if (docId) fetchVersions()
  }, [docId])

  const saveVersion = async () => {
    if (!editor) return
    const content = editor.getHTML()
    const timestamp = new Date().toISOString()

    try {
      const res = await fetch(`${BASE_URL}/api/versions/${docId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, timestamp }),
      })
      const data = await res.json()
      setVersions(data.versions || [])
    } catch (err) {
      console.error('Failed to save version:', err)
    }
  }

  const restoreVersion = (versionContent) => {
    if (!editor) return
    editor.commands.setContent(versionContent)
  }

  return { versions, saveVersion, restoreVersion }
}
