import { DateFormatPipe } from './date-format-pipe';
import { PriorityPipe } from './priority-pipe';

describe('DateFormatPipe', () => {
  const pipe = new DateFormatPipe();
  it('formats yyyy-MM-dd', () => expect(pipe.transform('2026-10-08')).toBe('08 Oct 2026'));
  it('handles empty values', () => expect(pipe.transform('')).toBe('—'));
});

describe('PriorityPipe', () => {
  const pipe = new PriorityPipe();
  it('adds an icon', () => expect(pipe.transform('High')).toBe('🔴 High'));
  it('falls back for unknown values', () => expect(pipe.transform('Weird')).toBe('⚪ Weird'));
});
