import React from 'react';

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 px-4 py-2 border-b bg-white dark:bg-gray-800 text-sm">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'font-bold text-indigo-600' : ''}>B</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'italic text-indigo-600' : ''}>I</button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'underline text-indigo-600' : ''}>U</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'text-indigo-600' : ''}>• List</button>
      <button onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'text-indigo-600' : ''}>H1</button>
      <button onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'text-indigo-600' : ''}>H2</button>
    </div>
  );
};

export default Toolbar;