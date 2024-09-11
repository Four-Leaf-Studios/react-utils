import { fireEvent, renderHook } from '@testing-library/react';
import { useOnClickOutside } from '../useOnClickOutside';

describe('useOnClickOutside', () => {
  it('should trigger the callback when clicking outside the element', () => {
    const callback = jest.fn();
    const ref = { current: document.createElement('div') };

    renderHook(() => useOnClickOutside(ref, callback));

    // Simulate a click outside the referenced element
    fireEvent.mouseDown(document);

    expect(callback).toHaveBeenCalled();
  });

  it('should not trigger the callback when clicking inside the element', () => {
    const callback = jest.fn();
    const ref = { current: document.createElement('div') };

    renderHook(() => useOnClickOutside(ref, callback));

    // Simulate a click inside the referenced element
    fireEvent.mouseDown(ref.current);

    expect(callback).not.toHaveBeenCalled();
  });
});
