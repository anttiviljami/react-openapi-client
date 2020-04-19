import React, { createContext, ReactNode } from 'react';
import OpenAPIClientAxios, { Document } from 'openapi-client-axios';

export const OpenAPIContext: React.Context<{
  api: OpenAPIClientAxios;
}> = createContext({ api: undefined });

interface Props {
  definition: string | Document;
  children?: ReactNode;
}

export const OpenAPIProvider = ({ children, ...clientOpts }: Props) => {
  const api = new OpenAPIClientAxios({ ...clientOpts });
  api.init();
  return <OpenAPIContext.Provider value={{ api }}>{children}</OpenAPIContext.Provider>;
};
