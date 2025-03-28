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

// 🔁 Component imports
import PageTitleBar from './PageTitleBar';
import Toolbar from './Toolbar';
import DocStatusBadge from './DocStatusBadge';
import VersionHistory from './VersionHistory';
import MarkdownExport from './MarkdownExport';
import PdfExport from './PdfExport';

const ydoc = new Y.Doc();
const provider = new WebsocketProvider('ws://localhost:1234', 'policy-room', ydoc);

const Editor = ({ content, docId }) => {
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [showVersions, setShowVersions] = useState(false);
  const timeoutRef = useRef(null);

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
        user: {
          name: 'Anonymous',
          color: '#38bdf8',
        },
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
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="rounded-lg shadow bg-white dark:bg-gray-800 border dark:border-gray-700">
      <PageTitleBar title="Untitled Document" onChange={(title) => console.log('Title:', title)} />

      <div className="flex justify-between items-center px-4 py-2 border-b dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
        <Toolbar editor={editor} />
        <div className="flex items-center gap-4">
          <DocStatusBadge status={saveStatus} />
          <button onClick={() => editor.chain().focus().undo().run()} className="hover:underline">↶ Undo</button>
          <button onClick={() => editor.chain().focus().redo().run()} className="hover:underline">↷ Redo</button>
          <button onClick={() => setShowVersions(true)} className="hover:underline">🕘 Versions</button>
          <MarkdownExport editor={editor} />
          <PdfExport editor={editor} />
        </div>
      </div>

      <EditorContent editor={editor} />

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
