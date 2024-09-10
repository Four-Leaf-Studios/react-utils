// src/__tests__/Image.test.tsx
import { render, screen } from '@testing-library/react';
import React from 'react';
import Image from '../Image';

describe('Image Component', () => {
  it('renders an image with the correct alt text', () => {
    render(<Image src="test-image.jpg" alt="Test Image" />);
    const imageElement = screen.getByAltText('Test Image');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'test-image.jpg');
  });
});
