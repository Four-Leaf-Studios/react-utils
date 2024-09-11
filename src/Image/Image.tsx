import React, { useState } from 'react';

// Define the props using React's ImgHTMLAttributes for the img element
type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  placeholderSrc?: string; // Optional placeholder source for lazy loading
  fallbackSrc?: string; // Optional fallback image if the original image fails to load
  sources?: Array<{ srcSet: string; media: string }>; // Optional sources for <picture>
  lazy?: boolean; // Whether the image should be lazy-loaded
};

// Create the Image component with the specified props
export const Image: React.FC<ImageProps> = ({
  placeholderSrc,
  fallbackSrc,
  src,
  srcSet,
  sizes,
  alt,
  width = 640,
  height = 360,
  sources,
  style,
  lazy = true, // Lazy-load by default, can be disabled for critical images
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(true); // To handle the loading state
  const [hasError, setHasError] = useState(false); // To handle errors

  const handleLoad = () => setIsLoading(false);
  const handleError = () => setHasError(true);

  // Default styles for the image
  const defaultStyles: React.CSSProperties = {
    opacity: isLoading ? 0.5 : 1, // Show a faded image while loading
    transition: 'opacity 0.3s ease-in-out', // Smooth transition
    objectFit: 'cover', // Ensure proper image fit
    width: width,
    height: height,
  };

  // Merge the user-defined styles with the default styles
  const combinedStyles = { ...defaultStyles, ...style };

  return (
    <picture>
      {/* If there are sources provided, render them */}
      {sources?.map((source, index) => (
        <source key={index} srcSet={source.srcSet} media={source.media} />
      ))}

      {/* Fallback <img> element */}
      <img
        src={
          isLoading && placeholderSrc
            ? placeholderSrc
            : hasError
              ? fallbackSrc
              : src
        }
        srcSet={!isLoading && !hasError ? srcSet : undefined} // Disable srcSet while loading
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : 'eager'} // Only lazy-load if the lazy prop is true
        decoding="async" // Asynchronous image decoding to improve performance
        onLoad={handleLoad} // Remove loading state when the image loads
        onError={handleError} // Switch to fallback image if an error occurs
        style={combinedStyles}
        {...rest}
      />
    </picture>
  );
};
