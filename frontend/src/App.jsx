import { useState, useEffect } from 'react';
import Editor from './components/Editor';
import PdfImportBar from './components/PDFImportBar';
import SummaryPanel from './components/SummaryPanel';
import VersionHistory from './components/VersionHistory';
import AuthForm from './components/AuthForm';
import UpgradeBanner from './components/UpgradeBanner';
import UserProfile from './components/UserProfile';
import NotificationPanel from './components/NotificationPanel';
import AnalyticsPanel from './components/AnalyticsPanel';
import WebScraperPanel from './components/WebScraperPanel';
import PremiumOnly from './components/PremiumOnly';
import supabase from './lib/supabaseClient';
import { saveDoc } from './lib/saveDoc';

const App = () => {
  const [session, setSession] = useState(null);
  const [userData, setUserData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [content, setContent] = useState('Loading...');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [docId] = useState('policy-draft-001');

  // Load auth session
  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    };
    initAuth();
  }, []);

  // Load user info and doc from Supabase
  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserData(user);
    };

    const loadDoc = async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('content')
        .eq('id', docId)
        .single();

      if (data?.content) setContent(data.content);
      else await saveDoc(docId, '');
    };

    if (session) {
      loadUser();
      loadDoc();
    }
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
      setContent(data.draft || '⚠️ PDF was empty.');
      await saveDoc(docId, data.draft);
    } catch (err) {
      setContent(`❌ Import failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-4">
      <UserProfile user={userData} />
      <UpgradeBanner user={userData} />
      <PdfImportBar pdfUrl={pdfUrl} setPdfUrl={setPdfUrl} onImport={handleImport} loading={loading} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Editor content={content} docId={docId} />
        </div>
        <div className="space-y-4">
          <SummaryPanel content={content} summary={summary} setSummary={setSummary} />
          <VersionHistory docId={docId} />
          <NotificationPanel docId={docId} />
          <AnalyticsPanel docId={docId} />
          <PremiumOnly>
            <WebScraperPanel />
          </PremiumOnly>
        </div>
      </div>
    </div>
  );
};

export default App;
