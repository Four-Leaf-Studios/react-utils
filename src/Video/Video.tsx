import React, { useState } from 'react';
import { Image } from '../Image/Image';

type VideoComponentProps = {
  thumbnail: string; // URL of the thumbnail image
  videoUrl: string; // URL of the video
  altText?: string; // Optional alt text for the thumbnail
  classes?: {
    container?: string;
    video?: string;
    thumbnail?: string;
  };
  videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>; // Additional props for the video element
};

const VideoComponent: React.FC<VideoComponentProps> = ({
  thumbnail,
  videoUrl,
  altText = 'Video Thumbnail',
  classes = {
    container: '',
    thumbnail: '',
    video: '',
  },
  videoProps = {
    width: 640,
    height: 360,
  },
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={classes.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
      }}
    >
      {isHovered ? (
        <video
          data-testid="video"
          className={classes.video}
          controls
          {...videoProps}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={thumbnail}
          alt={altText}
          className={classes.thumbnail}
          height={videoProps.height}
          width={videoProps.width}
        />
      )}
    </div>
  );
};

export default VideoComponent;
