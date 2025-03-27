const PdfImportBar = ({ pdfUrl, setPdfUrl, onImport, loading }) => (
    <div className="flex gap-2">
      <input
        className="flex-1 p-2 border rounded"
        type="text"
        placeholder="Enter PDF URL..."
        value={pdfUrl}
        onChange={(e) => setPdfUrl(e.target.value)}
      />
      <button
        onClick={onImport}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Importing...' : 'Import PDF'}
      </button>
    </div>
  )
  
  export default PdfImportBar
  