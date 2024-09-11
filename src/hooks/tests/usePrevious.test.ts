import { renderHook } from '@testing-library/react';
import { usePrevious } from '../usePrevious';

describe('usePrevious', () => {
  it('should return the previous value', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'initial' },
    });

    expect(result.current).toBeUndefined(); // Initially, there is no previous value

    rerender({ value: 'newValue' });

    expect(result.current).toBe('initial'); // Previous value should be 'initial'
  });
});
