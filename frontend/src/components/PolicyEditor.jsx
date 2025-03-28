import { useState } from "react";

export default function PolicyEditor({ record }) {
  const [text, setText] = useState(record.text);

  return (
    <div className="border p-4 rounded mb-6 shadow">
      <h2 className="font-bold text-lg mb-2">
        📍 {record.district}
      </h2>
      <p className="text-sm text-blue-600 mb-2">
        <a href={record.url} target="_blank" rel="noreferrer">{record.url}</a>
      </p>
      <textarea
        className="w-full h-60 p-3 border rounded resize-y"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="mt-2 px-4 py-2 bg-black text-white rounded">
        Save
      </button>
    </div>
  );
}
