import { useContext, useState, useCallback } from 'react';
import { OpenAPIContext } from './OpenAPIProvider';
import { UnknownOperationMethod, AxiosResponse, AxiosError } from 'openapi-client-axios';
import { ResponseObject } from './useOperation';

export function useOperationMethod(operationId: string): [UnknownOperationMethod, ResponseObject] {
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
        setError(err);
      }
      setLoading(false);
      return res;
    },
    [setLoading, setData, setError],
  );

  return [operationMethod, { loading, error, data, response, api }];
}
