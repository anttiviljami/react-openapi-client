import React, { createContext, ReactNode, useMemo } from 'react';
import OpenAPIClientAxios from 'openapi-client-axios';

export const OpenAPIContext: React.Context<{
  api: OpenAPIClientAxios;
}> = createContext({ api: undefined });

type OpenAPIClientAxiosOpts = ConstructorParameters<typeof OpenAPIClientAxios>[0];

interface Props extends OpenAPIClientAxiosOpts {
  children?: ReactNode;
}

export const OpenAPIProvider = ({ children, ...clientOpts }: Props) => {
  const api = useMemo(() => new OpenAPIClientAxios({ ...clientOpts }), [clientOpts]);
  try {
    api.initSync();
  } catch (err) {}
  return <OpenAPIContext.Provider value={{ api }}>{children}</OpenAPIContext.Provider>;
};
