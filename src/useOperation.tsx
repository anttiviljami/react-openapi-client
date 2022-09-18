import { useContext, useState, useEffect } from 'react';
import { OpenAPIContext } from './OpenAPIProvider';
import { AxiosResponse, OpenAPIClientAxios, UnknownOperationMethod, AxiosError } from 'openapi-client-axios';

type OperationParameters = Parameters<UnknownOperationMethod>;

export function useOperation(
  operationId: string,
  ...params: OperationParameters
): { loading: boolean; error?: Error; data?: any; response: AxiosResponse; api: OpenAPIClientAxios } {
  const { api, ready } = useContext(OpenAPIContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>(undefined);
  const [data, setData] = useState<any>(undefined);
  const [response, setResponse] = useState<AxiosResponse>(undefined);

  useEffect(() => {
    (async () => {
      if (ready) {
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
      }
    })();
  }, [api]);

  return { loading, error, data, response, api };
}
