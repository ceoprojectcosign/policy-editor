import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';

import supabase from '../lib/supabaseClient';
import toast from 'react-hot-toast';

const PublicDocument = () => {
  const { id } = useParams(); // 👈 from /doc/:id
  const [docContent, setDocContent] = useState('');
  const [loading, setLoading] = useState(true);

  const editor = useEditor({
    editable: false,
    content: docContent,
    extensions: [
      StarterKit,
      Heading,
      Bold,
      Italic,
      Underline,
      BulletList,
      ListItem,
    ],
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert max-w-none p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded shadow',
      },
    },
  });

  useEffect(() => {
    const fetchDoc = async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('content')
        .eq('id', id)
        .single();

      if (error) {
        toast.error('Document not found');
        setLoading(false);
        return;
      }

      setDocContent(data.content);
      setLoading(false);
    };

    fetchDoc();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading document...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-start pt-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">📄 Shared Draft</h1>
      {editor && <EditorContent editor={editor} />}
    </div>
  );
};

export default PublicDocument;
