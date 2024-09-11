import { act, renderHook } from '@testing-library/react';
import { useToggle } from '../useToggle';

describe('useToggle', () => {
  it('should toggle the value between true and false', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false); // Initial state should be false

    act(() => {
      result.current[1](); // Toggle the value
    });

    expect(result.current[0]).toBe(true); // Value should be true after toggle

    act(() => {
      result.current[1](); // Toggle the value again
    });

    expect(result.current[0]).toBe(false); // Value should be false again
  });
});
