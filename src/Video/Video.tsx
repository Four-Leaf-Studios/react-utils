import React from 'react';

type VideoProps = {
  src: string; // URL for the video source
} & React.VideoHTMLAttributes<HTMLVideoElement>; // Other video attributes

export const Video: React.FC<VideoProps> = ({ src, ...props }) => {
  return (
    <video data-testid="video" {...props}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
