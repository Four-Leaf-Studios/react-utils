import { render } from '@testing-library/react';
import React from 'react';
import { Image } from '../Image';

describe('Image Component', () => {
  it('renders an image with the correct alt text', () => {
    const { container } = render(
      <Image src="test-image.jpg" alt="Test Image" lazy={false} />
    ); // Disable lazy loading
    const imageElement = container.querySelector('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement?.getAttribute('alt')).toEqual('Test Image');
  });
});
