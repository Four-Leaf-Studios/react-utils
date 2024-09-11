import { renderHook } from '@testing-library/react';
import { useDocumentTitle } from '../useDocumentTitle';

describe('useDocumentTitle', () => {
  it('should set the document title', () => {
    renderHook(() => useDocumentTitle('New Title'));
    expect(document.title).toBe('New Title');
  });

  it('should update the document title when the title changes', () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: 'Initial Title' },
    });

    expect(document.title).toBe('Initial Title');

    rerender({ title: 'Updated Title' });

    expect(document.title).toBe('Updated Title');
  });
});
