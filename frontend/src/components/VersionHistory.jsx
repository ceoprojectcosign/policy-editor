import { useEffect, useState } from 'react'

const VersionHistory = ({ docId }) => {
  const [versions, setVersions] = useState([])

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/versions/${docId}`)
        const data = await res.json()
        setVersions(data.versions || [])
      } catch (err) {
        console.error('Failed to load versions:', err)
      }
    }

    fetchVersions()
  }, [docId])

  return (
    <div className="bg-white p-4 rounded shadow max-h-64 overflow-y-auto">
      <h3 className="font-semibold mb-2">Version History</h3>
      <ul className="text-sm space-y-1">
        {versions.map((v, i) => (
          <li key={i} className="text-gray-600">
            {new Date(v.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VersionHistory
