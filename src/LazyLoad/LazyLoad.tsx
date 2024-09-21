import React, { useEffect, useRef, useState } from 'react';

type LazyLoadProps = {
  children: React.ReactNode;
  rootMargin?: string; // Distance from the viewport at which the component should load
  threshold?: number; // How much of the component must be visible before loading
  height?: string;
};

export const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  rootMargin = '0px',
  threshold = 0.1,
  height = '100px',
}) => {
  const [isVisible, setIsVisible] = useState(false); // To track if the component is visible
  const ref = useRef<HTMLDivElement | null>(null); // Ref for the element to be observed

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Component is visible
            observer.disconnect(); // Stop observing once it's visible
          }
        });
      },
      { rootMargin, threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup observer when the component unmounts
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      style={{
        height: isVisible ? 'auto' : height,
      }}
    >
      {isVisible ? children : null}
    </div>
  );
};
