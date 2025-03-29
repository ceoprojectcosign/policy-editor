import { describe, it, expect } from 'vitest';
import { extractFlags } from './extractFlags';

describe('extractFlags', () => {
  it('flags matched terms', () => {
    const result = extractFlags("This policy relates to gender and bathrooms.");
    expect(result.gender).toBe(true);
    expect(result.bathroom).toBe(true);
    expect(result.CRT).toBe(false);
  });
});