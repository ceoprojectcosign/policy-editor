import { useState, useEffect } from 'react';

import Editor from '../components/editor/Editor';
import VersionHistory from '../components/editor/VersionHistory';
import PdfImportBar from '../components/PDFImportBar';
import SummaryPanel from '../components/SummaryPanel';
import UpgradeBanner from '../components/UpgradeBanner';
import UserProfile from '../components/UserProfile';
import NotificationPanel from '../components/NotificationPanel';
import AnalyticsPanel from '../components/AnalyticsPanel';
import WebScraperPanel from '../components/WebScraperPanel';
import PremiumOnly from '../components/PremiumOnly';
import EditorNoteForm from '../components/EditorNoteForm';
import AISummarySaver from '../components/AISummarySaver';
import SavedNotesList from '../components/SavedNotesList';
import SavedSummariesList from '../components/SavedSummariesList';

import supabase from '../lib/supabaseClient';
import { saveDoc } from '../lib/saveDoc';

export default function EditorPage({ session }) {
  const [userData, setUserData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [content, setContent] = useState('Loading...');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const docId = 'policy-draft-001';

  useEffect(() => {
    const loadUserAndDoc = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserData(user);

      const { data, error } = await supabase
        .from('documents')
        .select('content')
        .eq('id', docId)
        .single();

      if (data?.content) {
        setContent(data.content);
      } else {
        await saveDoc(docId, '');
      }
    };

    if (session) loadUserAndDoc();
  }, [session]);

  const handleImport = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/extract-draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfUrl }),
      });
      const data = await res.json();
      const draft = data?.draft || '⚠️ PDF was empty.';
      setContent(draft);
      await saveDoc(docId, draft);
    } catch (err) {
      console.error(err);
      setContent(`❌ Import failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 space-y-4">
      <UserProfile user={userData} />
      <UpgradeBanner user={userData} />
      <PdfImportBar pdfUrl={pdfUrl} setPdfUrl={setPdfUrl} onImport={handleImport} loading={loading} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <Editor content={content} docId={docId} />
          <EditorNoteForm documentId={docId} />
          <SavedNotesList documentId={docId} />
          <AISummarySaver />
          <SavedSummariesList />
        </div>

        <div className="space-y-4">
          <SummaryPanel content={content} summary={summary} setSummary={setSummary} />
          <VersionHistory docId={docId} />
          <NotificationPanel docId={docId} />
          <AnalyticsPanel docId={docId} />
          <PremiumOnly user={userData}>
            <WebScraperPanel />
          </PremiumOnly>
        </div>
      </div>
    </div>
  );
}
