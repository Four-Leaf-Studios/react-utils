// In your test file (useBreakpoints.test.ts)
import { renderHook } from '@testing-library/react';
import { useBreakpoints } from '../useBreakpoints';

describe('useBreakpoints', () => {
  beforeAll(() => {
    // Properly mock matchMedia with jest.fn and correct types
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(max-width: 768px)', // Simulate matching for mobile
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should correctly match breakpoints', () => {
    const { result } = renderHook(() =>
      useBreakpoints({
        mobile: '(max-width: 768px)',
        desktop: '(min-width: 769px)',
      })
    );

    // Assert the results for breakpoints
    expect(result.current.mobile).toBe(true);
    expect(result.current.desktop).toBe(false);
  });
});
