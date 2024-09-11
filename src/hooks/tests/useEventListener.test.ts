import { renderHook } from '@testing-library/react';
import { useEventListener } from '../useEventListener';

describe('useEventListener', () => {
  it('should add and remove an event listener', () => {
    const addEventListener = jest.spyOn(window, 'addEventListener');
    const removeEventListener = jest.spyOn(window, 'removeEventListener');
    const handler = jest.fn();

    const { unmount } = renderHook(() =>
      useEventListener('resize', handler, window)
    );

    expect(addEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    );
    unmount();
    expect(removeEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    );
  });
});
