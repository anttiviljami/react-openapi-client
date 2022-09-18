import React, { createContext, ReactNode, useMemo, useState } from 'react';
import OpenAPIClientAxios from 'openapi-client-axios';

export const OpenAPIContext: React.Context<{
  api: OpenAPIClientAxios;
  ready: boolean;
}> = createContext({ api: undefined, ready: undefined });

type OpenAPIClientAxiosOpts = ConstructorParameters<typeof OpenAPIClientAxios>[0];

interface Props extends OpenAPIClientAxiosOpts {
  children?: ReactNode;
  retry?: number;
}

export const OpenAPIProvider = ({ children, retry, ...clientOpts }: Props) => {
  const api = useMemo(() => new OpenAPIClientAxios({ ...clientOpts }), [clientOpts]);
  const [ready, setReady] = useState(true as boolean);
  const init = () => {
    try {
      api.initSync();
      if (!ready) setReady(true);
    } catch (e) {
      if (ready) setReady(false);
      if (retry) setTimeout(init, retry);
    }
  }
  useMemo(init, [clientOpts]);
  return <OpenAPIContext.Provider value={{ api, ready }}>{children}</OpenAPIContext.Provider>;
};
