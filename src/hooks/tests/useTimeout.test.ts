import { act, renderHook } from '@testing-library/react';
import { useTimeout } from '../useTimeout';

// Mock timers with Jest
jest.useFakeTimers();

describe('useTimeout', () => {
  it('should call the callback after the timeout', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, 1000));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call the callback if timeout is cleared', () => {
    const callback = jest.fn();

    // Explicitly type delay as number | null
    const { rerender } = renderHook(
      ({ delay }: { delay: number | null }) => useTimeout(callback, delay),
      {
        initialProps: { delay: 1000 } as { delay: number | null }, // Initial delay is 1000ms
      }
    );

    act(() => {
      jest.advanceTimersByTime(500); // Advance timers by 500ms
    });

    rerender({ delay: null });

    act(() => {
      jest.advanceTimersByTime(1000); // Advance timers by another 1000ms
    });

    // The callback should not have been called since the timeout was cleared
    expect(callback).not.toHaveBeenCalled();
  });
});
