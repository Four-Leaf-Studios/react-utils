import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import VideoComponent from '../Video';

// Mock Image component
jest.mock('../../Image/Image', () => ({
  Image: (props: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  }) => (
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={props.className}
    />
  ),
}));

describe('VideoComponent', () => {
  const thumbnailUrl = 'http://example.com/thumbnail.jpg';
  const videoUrl = 'http://example.com/video.mp4';

  test('renders thumbnail image by default', () => {
    render(<VideoComponent thumbnail={thumbnailUrl} videoUrl={videoUrl} />);

    // Check if the thumbnail is rendered
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', thumbnailUrl);
    expect(img).toHaveAttribute('alt', 'Video Thumbnail');
  });

  test('renders video when hovered', () => {
    render(<VideoComponent thumbnail={thumbnailUrl} videoUrl={videoUrl} />);

    // Check initial state (should be thumbnail)
    expect(screen.queryByTestId('video')).not.toBeInTheDocument();

    // Simulate hover
    const img = screen.getByRole('img');
    const container = img.parentElement as HTMLElement | null;
    if (container) {
      fireEvent.mouseEnter(container);
    }

    // Debug the DOM to inspect current state
    screen.debug();

    // Check if video is rendered on hover
    const video = screen.getByTestId('video');
    expect(video).toBeInTheDocument();

    // Check if the source element has the correct src attribute
    const source = video.querySelector('source');
    expect(source).toHaveAttribute('src', videoUrl);
  });

  test('renders video with provided videoProps', () => {
    const customWidth = 800;
    const customHeight = 600;

    render(
      <VideoComponent
        thumbnail={thumbnailUrl}
        videoUrl={videoUrl}
        videoProps={{ width: customWidth, height: customHeight }}
      />
    );

    // Simulate hover
    const img = screen.getByRole('img');
    const container = img.parentElement as HTMLElement | null;
    if (container) {
      fireEvent.mouseEnter(container);
    }

    // Debug the DOM to inspect current state
    screen.debug();

    // Check if video is rendered with the correct dimensions
    const video = screen.getByTestId('video');
    expect(video).toHaveAttribute('width', `${customWidth}`);
    expect(video).toHaveAttribute('height', `${customHeight}`);
  });

  test('renders Image with correct props', () => {
    render(
      <VideoComponent
        thumbnail={thumbnailUrl}
        videoUrl={videoUrl}
        altText="Custom Thumbnail"
        classes={{
          container: 'custom-container',
          thumbnail: 'custom-thumbnail',
          video: 'custom-video',
        }}
      />
    );

    // Check if the Image has correct props
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', thumbnailUrl);
    expect(img).toHaveAttribute('alt', 'Custom Thumbnail');
    expect(img).toHaveClass('custom-thumbnail');
  });
});
