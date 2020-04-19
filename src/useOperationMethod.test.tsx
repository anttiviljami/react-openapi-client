import React, { ReactNode } from 'react';
import fs from 'fs';
import path from 'path';
import { useOperationMethod, OpenAPIProvider } from '.';
import { renderHook, act } from '@testing-library/react-hooks';
import { AxiosResponse } from 'openapi-client-axios';

const definition = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', '__tests__', 'resources', 'openapi.json')).toString(),
);

describe('useOperationMethod', () => {
  const wrapper = ({ children }: { children?: ReactNode }) => (
    <OpenAPIProvider definition={definition}>{children}</OpenAPIProvider>
  );

  it('should return a method that calls the api operation method', async () => {
    // given
    const { result } = renderHook(() => useOperationMethod('getPets'), { wrapper });
    const [getPets, { api }] = result.current;
    const mock = jest.spyOn(api.client, 'getPets').mockImplementationOnce(() => null);

    // when
    await act(() => getPets());

    // then
    expect(mock).toBeCalled();
  });

  it('should set loading initially to false', async () => {
    // given
    const { result } = renderHook(() => useOperationMethod('getPets'), { wrapper });
    const [, { loading }] = result.current;

    // then
    expect(loading).toBe(false);
  });

  it('should set loading to true after calling the operation method', async () => {
    // given
    const { result, waitForValueToChange } = renderHook(() => useOperationMethod('getPets'), { wrapper });
    const [getPets, { api }] = result.current;
    jest.spyOn(api.client, 'getPets').mockImplementationOnce(() => null);

    // when
    act(() => {
      getPets();
    });

    // then
    expect(result.current[1].loading).toBe(true);
    await act(() => waitForValueToChange(() => result.current[1].loading));
  });

  describe('success response', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    it('should set response object', async () => {
      // given
      const { result } = renderHook(() => useOperationMethod('getPets'), { wrapper });
      const [getPets, { api }] = result.current;
      jest.spyOn(api.client, 'getPets').mockImplementationOnce(() => ({ status: 200, data: {} } as any));

      // when
      await act(() => getPets());

      // then
      expect(result.current[1].response.status).toBe(200);
    });

    it('should set data from response', async () => {
      // given
      const expected = { example: 1 };
      const { result } = renderHook(() => useOperationMethod('getPets'), { wrapper });
      const [getPets, { api }] = result.current;
      jest.spyOn(api.client, 'getPets').mockImplementationOnce(() => ({ status: 200, data: expected } as any));

      // when
      await act(() => getPets());

      // then
      expect(result.current[1].data).toBe(expected);
    });

    it('should set loading to false after endpoint returns', async () => {
      // given
      const { result } = renderHook(() => useOperationMethod('getPets'), { wrapper });
      const [getPets, { api }] = result.current;
      jest.spyOn(api.client, 'getPets').mockImplementationOnce(() => ({ status: 200, data: null } as any));

      // when
      await act(() => getPets());

      // then
      expect(result.current[1].loading).toBe(false);
    });

    it('error should be falsy', async () => {
      // given
      const { result } = renderHook(() => useOperationMethod('getPets'), { wrapper });
      const [getPets, { api }] = result.current;
      jest.spyOn(api.client, 'getPets').mockImplementationOnce(() => ({ status: 200, data: null } as any));

      // when
      await act(() => getPets());

      // then
      expect(result.current[1].error).toBeFalsy();
    });
  });

  describe('error response', () => {
    it('should not set data from response', async () => {
      // given
      const { result } = renderHook(() => useOperationMethod('getPets'), { wrapper });
      const [getPets, { api }] = result.current;
      jest.spyOn(api.client, 'getPets').mockImplementationOnce(() => {
        throw new Error();
      });

      // when
      await act(() => getPets());

      // then
      expect(result.current[1].data).toBe(undefined);
    });

    it('should set loading to false after endpoint returns', async () => {
      // given
      const { result } = renderHook(() => useOperationMethod('getPets'), { wrapper });
      const [getPets, { api }] = result.current;
      jest.spyOn(api.client, 'getPets').mockImplementationOnce(() => {
        throw new Error();
      });

      // when
      await act(() => getPets());

      // then
      expect(result.current[1].loading).toBe(false);
    });

    it('error should contain the thrown error', async () => {
      // given
      const expected = new Error();
      const { result } = renderHook(() => useOperationMethod('getPets'), { wrapper });
      const [getPets, { api }] = result.current;
      jest.spyOn(api.client, 'getPets').mockImplementationOnce(() => {
        throw expected;
      });

      // when
      await act(() => getPets());

      // then
      expect(result.current[1].error).toBe(expected);
    });
  });
});
