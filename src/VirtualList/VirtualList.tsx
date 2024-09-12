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
}: VirtualListProps<T>) => {
  const { visibleItems, containerStyle, placeholderStyle } = useVirtualList({
    items,
    itemHeight,
    itemWidth,
    columns,
    overscan: overScan,
  });

  const cache = useRef<Map<number, ReactNode>>(new Map());

  return (
    <div style={{ ...containerStyle, listStyleType: 'none', padding: 0 }}>
      <ul style={{ ...placeholderStyle }}>
        {visibleItems.map((item: T, index: number) => {
          // Calculate the item's actual index in the grid
          const actualIndex = items.indexOf(item);
          const row = Math.floor(actualIndex / columns);
          const column = actualIndex % columns;

          // Check if the component is already cached
          if (!cache.current.has(item.id)) {
            const renderedComponent = renderItem(item, index);
            cache.current.set(item.id, renderedComponent);
          }

          return (
            <li
              key={item.id}
              style={{
                gridRowStart: row + 1, // Position the item in the correct row
                gridColumnStart: column + 1, // Position the item in the correct column
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
