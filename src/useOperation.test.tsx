import React, { ReactNode, useContext } from 'react';
import fs from 'fs';
import path from 'path';
import { useOperation, OpenAPIProvider, OpenAPIContext } from '.';
import { renderHook, act } from '@testing-library/react-hooks';
import OpenAPIClientAxios, { OpenAPIClient } from 'openapi-client-axios';

const definition = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', '__tests__', 'resources', 'openapi.json')).toString(),
);

describe('useOperation', () => {
  const wrapper = ({ children }: { children?: ReactNode }) => (
    <OpenAPIProvider definition={definition}>{children}</OpenAPIProvider>
  );

  it('should call getPets', async () => {
    // given
    let api: OpenAPIClientAxios;
    const { result } = renderHook(
      () => {
        api = useContext(OpenAPIContext).api;
        return useOperation('getPets');
      },
      { wrapper },
    );
    await api.getClient();
    const mock = jest.spyOn(api.client, 'getPets').mockImplementationOnce(() => null);

    // when
    const [getPets] = result.current;
    await act(() => getPets());

    // then
    expect(mock).toBeCalled();
  });
});
