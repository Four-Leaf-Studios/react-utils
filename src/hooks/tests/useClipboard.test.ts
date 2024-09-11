import { act, renderHook } from '@testing-library/react';
import { useClipboard } from '../useClipboard';

describe('useClipboard', () => {
  it('should copy text to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined); // Mock resolved value

    // Use Object.defineProperty to mock the clipboard API
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      value: {
        writeText,
      },
      configurable: true,
    });

    // Render the hook
    const { result } = renderHook(() => useClipboard());
    const [, copyToClipboard] = result.current;

    // Perform the clipboard action
    await act(async () => {
      await copyToClipboard('Test text');
    });

    // Assertions
    expect(writeText).toHaveBeenCalledWith('Test text');
    expect(result.current[0]).toBe(true); // Assuming first value is whether it’s copied successfully
  });
});
