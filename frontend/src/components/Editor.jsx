import { useEffect, useRef, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import History from '@tiptap/extension-history';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';
import { saveDoc } from '../lib/saveDoc';
import toast from 'react-hot-toast';

import PageTitleBar from './PageTitleBar';
import Toolbar from './Toolbar';
import DocStatusBadge from './DocStatusBadge';
import VersionHistory from './VersionHistory';
import MarkdownExport from './MarkdownExport';
import PdfExport from './PdfExport';
import UserPresenceBar from './UserPresenceBar';
import EditTrackerPanel from './EditTrackerPanel';
import SectionApprovalBar from './SectionApprovalBar';
import SuggestedEditItem from './SuggestedEditItem';
import EmojiReactionsBar from './EmojiReactionsBar';
import LeaderboardPanel from './LeaderboardPanel';
import BadgeDisplay from './BadgeDisplay';
import ShareLinkButton from './ShareLinkButton';
import PublicToggle from './PublicToggle';

const ydoc = new Y.Doc();
const provider = new WebsocketProvider('ws://localhost:1234', 'policy-room', ydoc);

const Editor = ({ content, docId }) => {
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [showVersions, setShowVersions] = useState(false);
  const [editLog, setEditLog] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [emojiReactions, setEmojiReactions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([
    { name: 'Emily', points: 124 },
    { name: 'Alex', points: 97 },
    { name: 'Jordan', points: 85 },
  ]);
  const timeoutRef = useRef(null);

  const incrementPoints = (userName, points = 1) => {
    setLeaderboard((prev) => {
      const updated = prev.map((u) =>
        u.name === userName ? { ...u, points: u.points + points } : u
      );
      toast.success(`+${points} points awarded to ${userName}`);
      return updated;
    });
  };

  const debouncedSave = (html) => {
    clearTimeout(timeoutRef.current);
    setSaveStatus('Saving...');
    timeoutRef.current = setTimeout(async () => {
      await saveDoc(docId, html);
      setSaveStatus('Saved');
    }, 1000);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Heading,
      BulletList,
      ListItem,
      History,
      Collaboration.configure({ document: ydoc }),
      CollaborationCursor.configure({
        provider,
        user: { name: 'Anonymous', color: '#38bdf8' },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert max-w-none p-4 min-h-[400px] border rounded bg-white dark:bg-gray-800 dark:text-white',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      debouncedSave(html);

      setEditLog((prev) => [
        ...prev,
        { user: 'Anonymous', action: 'edited', text: html.slice(0, 30), timestamp: Date.now() },
      ]);

      incrementPoints('Anonymous', 1);
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const handleApproveSection = (sectionId) => {
    toast.success(`Section ${sectionId} approved`);
  };

  const handleRejectSection = (sectionId) => {
    toast.error(`Section ${sectionId} rejected`);
  };

  const handleAcceptSuggestion = (id) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
    toast.success('Suggestion accepted');
    incrementPoints('Anonymous', 2);
  };

  const handleRejectSuggestion = (id) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
    toast('Suggestion rejected', { icon: '❌' });
  };

  const handleEmojiReaction = (emoji) => {
    setEmojiReactions((prev) => [...prev, emoji]);
    toast(`Reacted with ${emoji}`);
  };

  return (
    <div className="rounded-lg shadow bg-white dark:bg-gray-800 border dark:border-gray-700">
      <PageTitleBar title="Untitled Document" onChange={(title) => console.log('Title:', title)} />

      <UserPresenceBar users={[{ name: 'Emily', color: '#f87171' }]} />

      <div className="flex justify-between items-center px-4 py-2 border-b dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
        <Toolbar editor={editor} />
        <div className="flex items-center gap-4">
          <PublicToggle docId={docId} />
          <ShareLinkButton docId={docId} />
          <BadgeDisplay role="editor" />
          <DocStatusBadge status={saveStatus} />
          <button onClick={() => editor.chain().focus().undo().run()} className="hover:underline">↶ Undo</button>
          <button onClick={() => editor.chain().focus().redo().run()} className="hover:underline">↷ Redo</button>
          <button onClick={() => setShowVersions(true)} className="hover:underline">🕘 Versions</button>
          <MarkdownExport editor={editor} />
          <PdfExport editor={editor} />
        </div>
      </div>

      <SectionApprovalBar
        sectionId="2.1"
        onApprove={handleApproveSection}
        onReject={handleRejectSection}
      />

      <EditorContent editor={editor} />

      <EmojiReactionsBar onReact={handleEmojiReaction} />

      <EditTrackerPanel changes={editLog} />

      {suggestions.map((s) => (
        <SuggestedEditItem
          key={s.id}
          suggestion={s}
          onAccept={handleAcceptSuggestion}
          onReject={handleRejectSuggestion}
        />
      ))}

      <LeaderboardPanel users={leaderboard} />

      <VersionHistory
        docId={docId}
        editor={editor}
        isOpen={showVersions}
        onClose={() => setShowVersions(false)}
      />
    </div>
  );
};

export default Editor;
