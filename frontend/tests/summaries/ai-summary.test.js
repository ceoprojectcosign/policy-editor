import { describe, it, expect } from 'vitest';

function getLatestSummary(summaries) {
  return summaries.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
}

describe('AI Summaries Logic', () => {
  const sample = [
    { summary: 'Old', created_at: '2023-01-01T00:00:00Z' },
    { summary: 'Newest', created_at: '2023-05-01T00:00:00Z' }
  ];

  it('returns the latest summary by timestamp', () => {
    const result = getLatestSummary(sample);
    expect(result.summary).toBe('Newest');
  });
});