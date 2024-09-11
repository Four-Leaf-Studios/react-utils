import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../useFetch';

// Create a mock for the Response object
globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ data: 'test' }),
    headers: new Headers(),
    redirected: false,
    statusText: 'OK',
    type: 'default',
    url: '',
    clone: () => this,
    body: null,
    bodyUsed: false,
    text: () => Promise.resolve(''),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
  })
) as jest.Mock;

describe('useFetch', () => {
  it('should fetch data successfully', async () => {
    const { result } = renderHook(() =>
      useFetch('https://api.example.com/data')
    );

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual({ data: 'test' });
    });
  });
});
