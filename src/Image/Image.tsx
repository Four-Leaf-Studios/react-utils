import React from 'react';

// Define the props using React's ImgHTMLAttributes for the img element
type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

// Create the Image component with the specified props
const Image: React.FC<ImageProps> = ({ ...rest }) => <img {...rest} />;

export default Image;
