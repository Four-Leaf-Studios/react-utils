import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { useHover } from '../useHover';

// Test component to use the hover hook
function TestComponent() {
  const [ref, hovered] = useHover<HTMLDivElement>();

  return (
    <div ref={ref} data-testid="hover-element">
      {hovered ? 'Hovered' : 'Not Hovered'}
    </div>
  );
}

describe('useHover', () => {
  it('should detect hover on an element', () => {
    const { getByTestId } = render(<TestComponent />);
    const element = getByTestId('hover-element');

    // Check initial state (not hovered)
    expect(element.textContent).toBe('Not Hovered');

    // Simulate mouse over (hover)
    fireEvent.mouseOver(element);
    expect(element.textContent).toBe('Hovered');

    // Simulate mouse out (no longer hovered)
    fireEvent.mouseOut(element);
    expect(element.textContent).toBe('Not Hovered');
  });
});
