import React, { ReactNode } from 'react';
import fs from 'fs';
import path from 'path';
import { useOperation, OpenAPIProvider } from '.';
import { renderHook, act } from '@testing-library/react-hooks';

const definition = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', '__tests__', 'resources', 'openapi.json')).toString(),
);

describe('useOperation', () => {
  const wrapper = ({ children }: { children?: ReactNode }) => (
    <OpenAPIProvider definition={definition}>{children}</OpenAPIProvider>
  );

  it('should call the api operation method', async () => {
    // given
    const { result, waitForValueToChange } = renderHook(() => useOperation('getPets'), { wrapper });
    const mock = jest.spyOn(result.current.api.client, 'getPets').mockImplementationOnce(async () => null);

    // when
    await act(() => waitForValueToChange(() => result.current.loading));

    // then
    expect(mock).toBeCalled();
  });

  it('should set loading initially to true', async () => {
    // given
    const { result, waitForValueToChange } = renderHook(() => useOperation('getPets'), { wrapper });
    jest.spyOn(result.current.api.client, 'getPets').mockImplementationOnce(async () => null);

    // when
    expect(result.current.loading).toBe(true);

    // then
    await act(() => waitForValueToChange(() => result.current.loading));
  });

  describe('success response', () => {
    it('should set response object', async () => {
      // given
      const { result, waitForNextUpdate } = renderHook(() => useOperation('getPets'), { wrapper });
      jest.spyOn(result.current.api.client, 'getPets').mockImplementationOnce(() => ({ status: 200, data: {} } as any));

      // when
      await act(() => waitForNextUpdate());

      // then
      expect(result.current.response).toBeTruthy();
    });

    it('should set data from response', async () => {
      // given
      const expected = { example: 1 };
      const { result, waitForNextUpdate } = renderHook(() => useOperation('getPets'), { wrapper });
      jest
        .spyOn(result.current.api.client, 'getPets')
        .mockImplementationOnce(() => ({ status: 200, data: expected } as any));

      // when
      await act(() => waitForNextUpdate());

      // then
      expect(result.current.data).toBe(expected);
    });

    it('should set loading to false after endpoint returns', async () => {
      // given
      const { result, waitForNextUpdate } = renderHook(() => useOperation('getPets'), { wrapper });
      jest
        .spyOn(result.current.api.client, 'getPets')
        .mockImplementationOnce(() => ({ status: 200, data: null } as any));

      // when
      await act(() => waitForNextUpdate());

      // then
      expect(result.current.loading).toBe(false);
    });

    it('error should be falsy', async () => {
      // given
      const { result, waitForNextUpdate } = renderHook(() => useOperation('getPets'), { wrapper });
      jest
        .spyOn(result.current.api.client, 'getPets')
        .mockImplementationOnce(() => ({ status: 200, data: null } as any));

      // when
      await act(() => waitForNextUpdate());

      // then
      expect(result.current.error).toBeFalsy();
    });
  });

  describe('error response', () => {
    it('should not set data from response', async () => {
      // given
      const { result, waitForNextUpdate } = renderHook(() => useOperation('getPets'), { wrapper });
      jest.spyOn(result.current.api.client, 'getPets').mockImplementationOnce(() => {
        throw new Error();
      });

      // when
      await act(() => waitForNextUpdate());

      // then
      expect(result.current.data).toBe(undefined);
    });

    it('should set loading to false after endpoint returns', async () => {
      // given
      const { result, waitForNextUpdate } = renderHook(() => useOperation('getPets'), { wrapper });
      jest.spyOn(result.current.api.client, 'getPets').mockImplementationOnce(() => {
        throw new Error();
      });

      // when
      await act(() => waitForNextUpdate());

      // then
      expect(result.current.loading).toBe(false);
    });

    it('error should contain the thrown error', async () => {
      // given
      const expected = new Error();
      const { result, waitForNextUpdate } = renderHook(() => useOperation('getPets'), { wrapper });
      jest.spyOn(result.current.api.client, 'getPets').mockImplementationOnce(() => {
        throw expected;
      });

      // when
      await act(() => waitForNextUpdate());

      // then
      expect(result.current.error).toBe(expected);
    });
  });
});
