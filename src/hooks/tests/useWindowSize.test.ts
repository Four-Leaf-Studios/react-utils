import { act, renderHook } from '@testing-library/react';
import { useWindowSize } from '../useWindowSize';

describe('useWindowSize', () => {
  it('should return the current window size', () => {
    // Mock the window dimensions
    window.innerWidth = 1024;
    window.innerHeight = 768;

    const { result } = renderHook(() => useWindowSize());

    // Assert the initial window size
    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it('should update the window size when resized', () => {
    const { result } = renderHook(() => useWindowSize());

    // Mock a window resize by updating window dimensions
    act(() => {
      window.innerWidth = 1280;
      window.innerHeight = 720;

      // Dispatch the resize event inside act
      window.dispatchEvent(new Event('resize'));
    });

    // Assert the updated window size
    expect(result.current.width).toBe(1280);
    expect(result.current.height).toBe(720);
  });
});
