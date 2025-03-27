// These are the core frontend files you need to fulfill the goals of your policy SaaS editor.
// Drop these into your VS Code project under /frontend/src, and tweak to your liking.

// 📄 1. App.jsx (Main layout + feature toggle)
// /src/App.jsx

import { useState, useEffect } from 'react'
import Editor from './components/Editor'
import PdfImportBar from './components/PDFImportBar'
import SummaryPanel from './components/SummaryPanel'
import VersionHistory from './components/VersionHistory'
import AuthPanel from './components/AuthPanel'
import UpgradeBanner from './components/UpgradeBanner'
import UserProfile from './components/UserProfile'
import NotificationPanel from './components/NotificationPanel'
import AnalyticsPanel from './components/AnalyticsPanel'
import WebScraperPanel from './components/WebScraperPanel'
import { supabase } from './lib/supabaseClient'
import { saveDoc } from './lib/saveDoc'

const App = () => {
  const [pdfUrl, setPdfUrl] = useState('')
  const [content, setContent] = useState('Loading...')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [docId] = useState('policy-draft-001')
  const [session, setSession] = useState(null)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUserData(user)
    }
    const loadDoc = async () => {
      if (!session) return
      const { data, error } = await supabase.from('documents').select('content').eq('id', docId).single()
      if (data?.content) setContent(data.content)
      else await saveDoc(docId, '')
    }
    if (session) {
      loadUser()
      loadDoc()
    }
  }, [session])

  const handleImport = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/extract-draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfUrl }),
      })
      const data = await res.json()
      setContent(data.draft || '⚠️ PDF was empty.')
      await saveDoc(docId, data.draft)
    } catch (err) {
      setContent(`❌ Import failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-4">
      <AuthPanel />
      <UserProfile user={userData} />
      <UpgradeBanner user={userData} />
      <PdfImportBar pdfUrl={pdfUrl} setPdfUrl={setPdfUrl} onImport={handleImport} loading={loading} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          {session ? <Editor content={content} docId={docId} /> : <p>Login to edit.</p>}
        </div>
        <div className="space-y-4">
          <SummaryPanel content={content} summary={summary} setSummary={setSummary} />
          <VersionHistory docId={docId} />
          <NotificationPanel docId={docId} />
          <AnalyticsPanel docId={docId} />
          <WebScraperPanel />
        </div>
      </div>
    </div>
  )
}

export default App
