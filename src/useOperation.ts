import React, { useContext, useState } from 'react';
import { OpenAPIContext } from './OpenAPIProvider';
import { UnknownOperationMethod, AxiosResponse } from 'openapi-client-axios';

export const useOperation = (operationId: string) => {
  const { api } = useContext(OpenAPIContext);
  const client = api.client;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined);

  const operationMethod: UnknownOperationMethod = async (...params) => {
    setLoading(true);
    let res: AxiosResponse;
    try {
      res = await client[operationId](...params);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    return res;
  };

  return [operationMethod, { loading, error, data }];
};
