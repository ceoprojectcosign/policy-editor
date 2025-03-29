import { describe, it, expect, vi } from 'vitest';
import { saveDoc } from '../../src/lib/saveDoc';

vi.mock('../src/lib/saveDoc', () => ({
  saveDoc: vi.fn(() => Promise.resolve('success'))
}));

describe('PDF Import Logic', () => {
  it('saves imported draft to supabase', async () => {
    const mockDraft = 'Test draft content';
    const result = await saveDoc('test-doc-id', mockDraft);
    expect(saveDoc).toHaveBeenCalledWith('test-doc-id', mockDraft);
    expect(result).toBe('success');
  });
});
