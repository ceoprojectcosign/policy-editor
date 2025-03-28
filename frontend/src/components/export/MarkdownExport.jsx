import React from 'react';

const MarkdownExport = ({ editor }) => {
  const exportToMarkdown = () => {
    if (!editor) return;
    const markdown = editor.getJSON(); // You may replace with real markdown export logic
    const blob = new Blob([JSON.stringify(markdown, null, 2)], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={exportToMarkdown} className="text-sm text-indigo-600 hover:underline">
      Export Markdown
    </button>
  );
};

export default MarkdownExport;