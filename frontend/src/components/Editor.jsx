import { useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { saveDoc } from '../lib/saveDoc';

const Editor = ({ content, docId }) => {
  const timeoutRef = useRef(null);

  const debouncedSave = (html) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      saveDoc(docId, html);
    }, 1000);
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none p-4 min-h-[400px] border rounded bg-white dark:bg-gray-800 dark:text-white',
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
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
