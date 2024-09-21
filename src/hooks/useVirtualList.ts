import { useCallback, useEffect, useRef, useState } from 'react';

interface UseVirtualListProps<T> {
  items: T[];
  itemHeight: number;
  itemWidth: number;
  columns: number;
  overscan?: number;
  gridGap?: number; // Add gridGap to the props
}

interface VirtualListData<T> {
  visibleItems: T[];
  containerStyle: React.CSSProperties;
  placeholderStyle: React.CSSProperties;
}

export function useVirtualList<T>({
  items,
  itemHeight,
  itemWidth,
  columns,
  overscan = 2,
  gridGap = 0, // Default gridGap
}: UseVirtualListProps<T>): VirtualListData<T> {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [, setWindowWidth] = useState(window.innerWidth);

  const scrollTopRef = useRef<number>(0);

  // Adjust the visibleRowCount to include gridGap
  const visibleRowCount = Math.ceil(
    (windowHeight + gridGap) / (itemHeight + gridGap)
  );
  const itemsPerRow = columns; // Number of columns is now based on prop

  const handleScroll = useCallback(() => {
    scrollTopRef.current = window.scrollY;

    requestAnimationFrame(() => {
      const newScrollTop = scrollTopRef.current;

      // Calculate rowIndex based on the itemHeight and gridGap
      const rowIndex = Math.floor(newScrollTop / (itemHeight + gridGap));

      const newStartRow = Math.max(0, rowIndex - overscan);
      const newEndRow = Math.min(
        Math.ceil(items.length / itemsPerRow) - 1,
        rowIndex + visibleRowCount + overscan
      );

      const newStartIndex = newStartRow * itemsPerRow;
      const newEndIndex = Math.min(
        items.length - 1,
        (newEndRow + 1) * itemsPerRow - 1
      );

      if (newStartIndex !== startIndex || newEndIndex !== endIndex) {
        setStartIndex(newStartIndex);
        setEndIndex(newEndIndex);
      }
    });
  }, [
    itemHeight,
    items.length,
    itemsPerRow,
    gridGap, // Include gridGap in the scroll calculations
    overscan,
    startIndex,
    endIndex,
    visibleRowCount,
  ]);

  const handleResize = useCallback(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  // Adjust the totalHeight to account for gridGap between rows
  const totalHeight =
    Math.ceil(items.length / itemsPerRow) * (itemHeight + gridGap) - gridGap;

  return {
    visibleItems: items.slice(startIndex, endIndex + 1),
    containerStyle: {
      height: `${totalHeight}px`,
      position: 'relative',
    },
    placeholderStyle: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, ${itemWidth}px)`,
      gridAutoRows: `${itemHeight}px`,
      gap: `${gridGap}px`, // Apply grid gap here
    },
  };
}
