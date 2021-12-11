# React OpenAPI Client

[![CI](https://github.com/anttiviljami/react-openapi-client/workflows/CI/badge.svg)](https://github.com/anttiviljami/react-openapi-client/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/react-openapi-client.svg)](https://www.npmjs.com/package/react-openapi-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-openapi-client?label=gzip%20bundle)](https://bundlephobia.com/package/react-openapi-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/anttiviljami/react-openapi-client/blob/master/LICENSE)
[![Buy me a coffee](https://img.shields.io/badge/donate-buy%20me%20a%20coffee-orange)](https://buymeacoff.ee/anttiviljami)

Consume OpenAPI-enabled APIs with React Hooks

Uses [`openapi-client-axios`](https://www.npmjs.com/package/openapi-client-axios) under the hood.

## Why?

You can do this:

```jsx
import React, { useEffect } from 'react';
import { useOperation } from 'react-openapi-client';

const MyComponent = (props) => {
  const { loading, data, error } = useOperation('getPetById', props.id);
  // ...
};
```

Instead of:

```jsx
import React, { useEffect, useState } from 'react';

const MyComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://petstore.swagger.io/api/v3/pet/${props.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await res.json();
        setData(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    })();
  }, [props.id]);

  // ...
};
```

## Getting Started

Install `react-openapi-client` as a dependency

```
npm install --save react-openapi-client axios
```

Wrap your React App with an `OpenAPIProvider`, passing your OpenAPI definition as a prop.

```jsx
import React from 'react';
import { render } from 'react-dom';
import { OpenAPIProvider } from 'react-openapi-client';

const App = () => (
  <OpenAPIProvider definition="http://petstore.swagger.io:8080/api/v3/openapi.json">
    <PetDetails id={1} />
  </OpenAPIProvider>
);
```

Now you can start using the `useOperation` and `useOperationMethod` hooks in your components.

```jsx
import { useOperation } from 'react-openapi-client';

const PetDetails = (props) => {
  const { loading, data, error } = useOperation('getPetById', props.id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <img src={data.image} alt={data.name} />
      <h3>{data.name}</h3>
      <ul>
        <li>
          <strong>id:</strong> {data.id}
        </li>
        <li>
          <strong>status:</strong> {data.status}
        </li>
      </ul>
    </div>
  );
};
```

See a full Create-React-App example under [`examples/`](https://github.com/anttiviljami/react-openapi-client/tree/master/examples/)

## useOperation hook

The `useOperation` hook is a great way to declaratively fetch data from your API.

Important! Calling `useOperation()` always immediately calls the API endpoint.

Parameters:

`useOperation` passes the arguments to an OpenAPI Client Axios [`Operation Method`](https://github.com/anttiviljami/openapi-client-axios#operation-methods)
matching the operationId given as the first parameter.

- [**operationId**](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#fixed-fields-8) (string) Required. the operationId of the operation to call
- [**parameters**](https://github.com/anttiviljami/openapi-client-axios#parameters) (object | string | number) Optional. Parameters for the operation
- [**data**](https://github.com/anttiviljami/openapi-client-axios#data) (object | string | Buffer) Optional. Request payload for the operation
- [**config**](https://github.com/anttiviljami/openapi-client-axios#config-object) (AxiosRequestConfig) Optional. Request payload for the operation

Return value:

`useOperation` returns an object containing the following state properties:

- **loading** (boolean) whether the API request is currently ongoing.
- **data** (any) the parsed response data for the operation.
- **response** (any) the raw axios response object for the operation.
- **error** (Error) contains an error object, in case the request fails
- **api** (OpenAPIClientAxios) reference to the API client class instance

Example usage:

```javascript
const { loading, data, error } = useOperation('getPetById', 1, null, { headers: { 'x-api-key': 'secret' } });
```

## useOperationMethod hook

The `useOperationMethod` hook can be used to obtain a callable operation method.

Unlike `useOperation`, calling `useOperationMethod()` has no side effects.

Parameters:

`useOperationMethod` gets the corresponding OpenAPI Client Axios [`Operation Method`](https://github.com/anttiviljami/openapi-client-axios#operation-methods)
matching the operationId.

- [**operationId**](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#fixed-fields-8) (string) Required. the operationId of the operation to call

Return value:

`useOperationMethod` returns a tuple (javascript array), where the first
element is the callable operation method, and the second method contains the
same object as `useOperation`'s return value.

See [OpenAPI Client Axios documentation](https://github.com/anttiviljami/openapi-client-axios/blob/master/DOCS.md#operation-method)
for more details on how to use the Operation Methods.

Example usage:

```javascript
const [createPet, { loading, response, error }] = useOperationMethod('createPet');
```

## OpenAPIProvider

The `OpenAPIProvider` component provides `OpenAPIContext` to all nested components in the
React DOM so they can use the `useOperation` and `useOperationMethod` hooks.

Internally, the Provider instantiates an instance of OpenAPIClientAxios, which
is then used by the hooks to call the API operations.

In addition to the definition file, you can pass any [constructor options](https://github.com/anttiviljami/openapi-client-axios/blob/master/DOCS.md#class-openapiclientaxios)
accepted by OpenAPIClientAxios as props to the `OpenAPIProvider` component.

Example usage:

```jsx
const App = () => (
  <OpenAPIProvider definition="http://petstore.swagger.io:8080/api/v3/openapi.json" axiosConfigDefaults={{ withCredentials: true }}>
    <ApplicationLayout />
  </OpenAPIProvider>
)
```

You can also access the `OpenAPIClientAxios` instance by using the React `useContext` hook:

```jsx
import React, { useContext } from 'react';
import { OpenAPIContext } from 'react-openapi-client';

const MyComponent = () => {
  const { api } = useContext(OpenAPIContext);
  const client = api.client;
  const definition = api.definition;
  // ...
}
```

## Contributing

React OpenAPI Client is Free and Open Source Software. Issues and pull requests are more than welcome!

[<img alt="The Chilicorn" src="http://spiceprogram.org/assets/img/chilicorn_sticker.svg" width="250" height="250">](https://spiceprogram.org/oss-sponsorship)
