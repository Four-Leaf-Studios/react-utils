import { render, screen } from '@testing-library/react';
import React from 'react';
import { Video } from '../Video'; // Adjust the import path as necessary

describe('Video Component', () => {
  test('renders video with the correct src and attributes', () => {
    const videoSrc = 'http://example.com/video.mp4';
    const videoProps = {
      width: 640,
      height: 360,
      controls: true,
      poster: 'http://example.com/poster.jpg',
    };

    render(<Video src={videoSrc} {...videoProps} />);

    // Check if the video element is rendered
    const videoElement = screen.getByTestId('video');
    expect(videoElement).toBeInTheDocument();

    // Check if the source element has the correct src attribute
    const sourceElement = videoElement.querySelector('source');
    expect(sourceElement).toHaveAttribute('src', videoSrc);

    // Check if video element has the correct attributes
    expect(videoElement).toHaveAttribute('width', videoProps.width.toString());
    expect(videoElement).toHaveAttribute(
      'height',
      videoProps.height.toString()
    );
    expect(videoElement).toHaveAttribute('controls');
    expect(videoElement).toHaveAttribute('poster', videoProps.poster);
  });
});
