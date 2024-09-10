import '@testing-library/jest-dom'; // Provides helpful DOM matchers
import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import LazyLoad from '../LazyLoad';

// Mocking IntersectionObserver
beforeAll(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe('LazyLoad Component', () => {
  test('renders children when intersection occurs', async () => {
    render(
      <LazyLoad>
        <div data-testid="lazy-loaded-component">Lazy Loaded Content</div>
      </LazyLoad>
    );

    // Initially, the lazy loaded component should not be in the document
    expect(screen.queryByTestId('lazy-loaded-component')).toBeNull();

    // Simulate intersection by making the component visible, wrap in `act()`
    const observerCallback = (window.IntersectionObserver as jest.Mock).mock
      .calls[0][0];

    await act(async () => {
      observerCallback([
        {
          isIntersecting: true, // Simulate the component entering the viewport
        },
      ]);
    });

    // Wait for the component to re-render and become visible
    await waitFor(() =>
      expect(screen.getByTestId('lazy-loaded-component')).toBeInTheDocument()
    );
  });
});
