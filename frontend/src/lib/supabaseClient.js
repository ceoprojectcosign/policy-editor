import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// === VersionHistory.jsx ===
// /src/components/VersionHistory.jsx
import { useEffect, useState } from 'react'

const VersionHistory = ({ docId }) => {
  const [versions, setVersions] = useState([])

  useEffect(() => {
    const fetchVersions = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/versions/${docId}`)
      const data = await res.json()
      setVersions(data)
    }
    fetchVersions()
  }, [docId])

  return (
    <div>
      <h3 className="font-bold">Version History</h3>
      <ul>
        {versions.map((v, i) => (
          <li key={i}>{v.version} – {new Date(v.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  )
}

export default VersionHistory