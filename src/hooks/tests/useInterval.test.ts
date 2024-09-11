import { act, renderHook } from '@testing-library/react';
import { useInterval } from '../useInterval';

jest.useFakeTimers();

describe('useInterval', () => {
  it('should call the callback at the specified interval', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('should stop calling the callback if interval is cleared', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ delay }) => useInterval(callback, delay),
      {
        initialProps: { delay: 1000 } as { delay: number | null },
      }
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ delay: null }); // Stop the interval

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(callback).toHaveBeenCalledTimes(1); // Should not have been called again
  });
});
