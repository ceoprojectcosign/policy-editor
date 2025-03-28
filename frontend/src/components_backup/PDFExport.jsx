import React from 'react';
import html2pdf from 'html2pdf.js';

const PdfExport = ({ editor }) => {
  const exportToPDF = () => {
    if (!editor) return;
    const html = editor.getHTML();
    const container = document.createElement('div');
    container.innerHTML = html;
    html2pdf().from(container).save('document.pdf');
  };

  return (
    <button onClick={exportToPDF} className="text-sm text-indigo-600 hover:underline">
      Export PDF
    </button>
  );
};

export default PdfExport;