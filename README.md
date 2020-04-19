# React OpenAPI Client

[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/anttiviljami/openapi-client-axios/blob/master/LICENSE)

Consume OpenAPI-enabled APIs with React Hooks

Uses [`openapi-client-axios`](https://www.npmjs.com/package/openapi-client-axios) under the hood.

## Why?

Instead of:

```jsx
import React, { useEffect, useState } from 'react';

const MyComponent = (props) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

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
        const data = res.json();
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

You can do this:

```jsx
import React, { useEffect } from 'react';
import { useOperation } from 'react-openapi-client';

const PetDetails = (props) => {
  const [getPetById, { loading, error, data }] = useOperation('getPetById');

  useEffect(() => {
    getPetById(props.id);
  }, [getPetById, props.id]);

  // ...
};
```

## Getting Started

Install `react-openapi-client` as a dependency

```
npm install --save react-openapi-client
```

Wrap your React App with an `OpenAPIProvider`, passing your OpenAPI definition.

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

Now you can start using the `useOperation` hook in your components.

```jsx
const PetDetails = (props) => {
  const [getPetById, { loading, error, data }] = useOperation('getPetById');

  useEffect(() => {
    getPetById(props.id);
  }, [getPetById, props.id]);

  if (loading || !data) {
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

## Contributing

React OpenAPI Client is Free and Open Source Software. Issues and pull requests are more than welcome!

[<img alt="The Chilicorn" src="http://spiceprogram.org/assets/img/chilicorn_sticker.svg" width="250" height="250">](https://spiceprogram.org/oss-sponsorship)
