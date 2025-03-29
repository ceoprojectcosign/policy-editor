import { describe, it, expect } from 'vitest';

function getNotesByDocId(notes, docId) {
  return notes.filter(note => note.document_id === docId);
}

describe('Editor Notes Logic', () => {
  const sampleNotes = [
    { document_id: 'doc1', note: 'Note 1' },
    { document_id: 'doc2', note: 'Note 2' },
    { document_id: 'doc1', note: 'Note 3' }
  ];

  it('filters notes by document id', () => {
    const result = getNotesByDocId(sampleNotes, 'doc1');
    expect(result.length).toBe(2);
    expect(result[0].note).toBe('Note 1');
    expect(result[1].note).toBe('Note 3');
  });
});