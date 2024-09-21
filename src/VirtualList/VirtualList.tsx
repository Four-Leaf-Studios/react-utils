import React, { ReactNode, useRef } from 'react';
import { useVirtualList } from '../hooks';

// Define the type for VirtualListProps
interface VirtualListProps<T> {
  items: T[]; // Array of generic items
  itemHeight?: number; // Height of each item
  overScan?: number; // Overscan property
  renderItem?: (item: T, index: number) => ReactNode; // Function to render each item
  itemWidth?: number; // Width of each item
  columns?: number; // Number of columns
  gridGap?: number; // Gap between grid items
}

// Define a type for the generic item, if needed
interface Item {
  id: number;
}

export const VirtualList = <T extends Item>({
  items = [],
  itemHeight = 150,
  overScan = 10,
  renderItem = (item, index) => <div>{`Item ${index}`}</div>,
  itemWidth = 150,
  columns = 3,
  gridGap = 10, // Default gap
}: VirtualListProps<T>) => {
  const { visibleItems, containerStyle, placeholderStyle } = useVirtualList({
    items,
    itemHeight,
    itemWidth,
    columns,
    overscan: overScan,
    gridGap, // Pass the gridGap to the hook
  });

  const cache = useRef<Map<number, ReactNode>>(new Map());

  return (
    <div style={{ ...containerStyle, listStyleType: 'none', padding: 0 }}>
      <ul style={{ ...placeholderStyle, gap: `${gridGap}px` }}>
        {visibleItems.map((item: T, index: number) => {
          const actualIndex = items.indexOf(item);
          const row = Math.floor(actualIndex / columns);
          const column = actualIndex % columns;

          if (!cache.current.has(item.id)) {
            const renderedComponent = renderItem(item, index);
            cache.current.set(item.id, renderedComponent);
          }

          return (
            <li
              key={item.id}
              style={{
                gridRowStart: row + 1,
                gridColumnStart: column + 1,
                width: `${itemWidth}px`,
                height: `${itemHeight}px`,
              }}
            >
              {cache.current.get(item.id)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
