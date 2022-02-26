import { useContext, useState, useCallback } from 'react';
import { OpenAPIContext } from './OpenAPIProvider';
import { UnknownOperationMethod, OpenAPIClientAxios, AxiosResponse, AxiosError } from 'openapi-client-axios';

export function useOperationMethod(
  operationId: string,
): [
  UnknownOperationMethod,
  { loading: boolean; error?: Error; data?: any; response: AxiosResponse; api: OpenAPIClientAxios },
] {
  const { api } = useContext(OpenAPIContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>(undefined);
  const [data, setData] = useState<any>(undefined);
  const [response, setResponse] = useState<AxiosResponse>(undefined);

  const operationMethod: UnknownOperationMethod = useCallback(
    async (...params) => {
      setLoading(true);
      const client = await api.getClient();
      let res: AxiosResponse;
      try {
        res = await client[operationId](...params);
        setResponse(res);
        setData(res.data);
      } catch (err) {
        setError(err as AxiosError);
      }
      setLoading(false);
      return res;
    },
    [setLoading, setData, setError, api],
  );

  return [operationMethod, { loading, error, data, response, api }];
}
