import { useContext, useState, useEffect } from 'react';
import { OpenAPIContext } from './OpenAPIProvider';
import { AxiosResponse, OpenAPIClientAxios, UnknownOperationMethod, AxiosError } from 'openapi-client-axios';

export type ResponseObject<ResponseType = any> = {
  loading: boolean;
  error?: Error;
  data?: ResponseType;
  response: AxiosResponse<ResponseType>;
  api: OpenAPIClientAxios;
};

export function useOperation(operationId: string, ...params: Parameters<UnknownOperationMethod>): ResponseObject {
  const { api } = useContext(OpenAPIContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>(undefined);
  const [data, setData] = useState<any>(undefined);
  const [response, setResponse] = useState<AxiosResponse>(undefined);

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return { loading, error, data, response, api };
}
