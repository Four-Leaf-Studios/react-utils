# React Utils

**React Utils** is a utility package for React that provides reusable components and functions to help you streamline development.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
  - [Image Component](#image-component)
  - [LazyLoad Component](#lazyload-component)
- [Testing](#testing)
- [Linting and Formatting](#linting-and-formatting)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the package via npm or yarn:

```bash
npm install react-utils
# or
yarn add react-utils
```

## Usage

To use any of the components or utility functions provided by React Utils, simply import them into your project:

```tsx
import { Image, LazyLoad } from 'react-utils';

const App = () => (
  <div>
    <Image src="example.jpg" alt="Example Image" />
    <div>
      <h1>Lazy Load Example</h1>
      <p>Scroll down to see the lazy-loaded component.</p>

      <div style={{ height: '100vh' }} />

      <LazyLoad rootMargin="100px" threshold={0.25}>
        <ComponentYouWantLazyLoaded />
      </LazyLoad>

      <div style={{ height: '100vh' }} />
    </div>
  </div>
);

export default App;
```

## Components

### Image Component

The Image component is a reusable wrapper around the native HTML <img> element. It provides support for all standard image attributes, as well as any additional props that you want to pass through.

#### Usage Example

```tsx
import { Image } from 'react-utils';

const MyComponent = () => (
  <Image
    src="https://example.com/image.jpg"
    alt="A beautiful example image"
    width={500}
    height={300}
    placeholderSrc="https://example.com/placeholder.jpg"
    fallbackSrc="https://example.com/fallback.jpg"
    lazy={true} // Lazy load image by default
    sources={[
      {
        srcSet: 'https://example.com/image-320w.jpg',
        media: '(max-width: 600px)',
      },
      {
        srcSet: 'https://example.com/image-640w.jpg',
        media: '(min-width: 601px)',
      },
    ]}
  />
);
```

#### Props

src: The URL of the image to display.
alt: Alternate text to display when the image cannot load.
width: Optional width for the image.
height: Optional height for the image.
You can pass any other valid image attributes (such as loading, ref, etc.) as props, which will be spread onto the <img> element.

### LazyLoad Component

The LazyLoad component allows you to defer rendering its children until the containing element is visible in the viewport. This is useful for improving performance by lazy-loading non-critical content.

#### Usage Example

```tsx
import { LazyLoad } from 'react-utils';

const MyComponent = () => (
  <LazyLoad rootMargin="100px" threshold={0.25}>
    <div>Lazy Loaded Content</div>
  </LazyLoad>
);
```

#### Props

rootMargin: Defines the margin around the root. This is used to determine how close the element is to the viewport before it is loaded. Defaults to "0px".
threshold: Defines how much of the element must be visible before it is loaded. Defaults to 0.1 (10% visibility).

## Testing

This package uses Jest and React Testing Library for unit testing.

To run the tests, use the following command:

```bash
npm run test
```

or if you are using yarn:

```bash
Copy code
yarn test


```

### Example Test (for Image component)

```tsx
import { render, screen } from '@testing-library/react';
import { Image } from 'react-utils';

test('renders image with correct alt text', () => {
  render(<Image src="example.jpg" alt="Example Image" />);
  const imgElement = screen.getByAltText('Example Image');
  expect(imgElement).toBeInTheDocument();
  expect(imgElement).toHaveAttribute('src', 'example.jpg');
});
```

### Example Test (for LazyLoad component)

```tsx
import { render, screen, act, waitFor } from '@testing-library/react';
import LazyLoad from 'react-utils/LazyLoad';

// Mocking IntersectionObserver
beforeAll(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

test('LazyLoad renders children when intersection occurs', async () => {
  render(
    <LazyLoad>
      <div data-testid="lazy-loaded">Lazy Loaded Content</div>
    </LazyLoad>
  );

  // Initially, the lazy loaded content should not be in the document
  expect(screen.queryByTestId('lazy-loaded')).toBeNull();

  // Simulate intersection
  const observerCallback = (window.IntersectionObserver as jest.Mock).mock
    .calls[0][0];
  await act(async () => {
    observerCallback([{ isIntersecting: true }]);
  });

  // The content should now be visible
  await waitFor(() =>
    expect(screen.getByTestId('lazy-loaded')).toBeInTheDocument()
  );
});
```

## Linting and Formatting

This package uses ESLint for code linting and Prettier for code formatting.

To run the linter and ensure that the code conforms to best practices, use the following commands:

```bash
npm run lint

# or

yarn lint

```

### To format the code with Prettier:

```bash
npm run prettier

# or

yarn prettier
```

These tools help maintain code quality and consistency across the project.

## Contributing

Contributions are welcome! Please follow the steps below to contribute:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Run the linter and tests to ensure everything is in order.
Commit your changes (git commit -m 'Add feature').
Push to the branch (git push origin feature-branch).
Create a pull request.
Please make sure that your contributions align with the overall coding style and that your code is tested.

## License

This package is licensed under the MIT License. See the LICENSE file for more information.

This version provides an overview of the package, how to install it, how to use it, and how to contribute, as well as basic information about testing, linting, and formatting. Let me know if you need additional sections or adjustments!
