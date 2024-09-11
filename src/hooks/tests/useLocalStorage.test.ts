import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with the value from localStorage', () => {
    localStorage.setItem('key', JSON.stringify('stored value'));

    const { result } = renderHook(() => useLocalStorage('key', 'default'));

    expect(result.current[0]).toBe('stored value');
  });

  it('should update the value in localStorage when state changes', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));

    act(() => {
      result.current[1]('new value');
    });

    expect(localStorage.getItem('key')).toBe(JSON.stringify('new value'));
  });
});
