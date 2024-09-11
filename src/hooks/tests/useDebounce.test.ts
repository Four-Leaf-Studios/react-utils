import { act, renderHook } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  // Enable fake timers before all tests in this describe block
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // Clean up fake timers after each test
  afterEach(() => {
    jest.runOnlyPendingTimers(); // Run any pending timers
    jest.useRealTimers(); // Restore real timers after the test
  });

  it('should debounce the value after a delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    expect(result.current).toBe('initial'); // Initial value should be 'initial'

    rerender({ value: 'newValue', delay: 500 }); // Rerender with new value

    act(() => {
      jest.advanceTimersByTime(300); // 300ms should not trigger the debounce yet
    });

    expect(result.current).toBe('initial'); // Should still be 'initial'

    act(() => {
      jest.advanceTimersByTime(200); // Now 500ms has passed
    });

    expect(result.current).toBe('newValue'); // Value should now be updated
  });
});
