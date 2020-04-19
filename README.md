# React OpenAPI Client

[![CI](https://github.com/anttiviljami/react-openapi-client/workflows/CI/badge.svg)](https://github.com/anttiviljami/react-openapi-client/actions?query=workflow%3ACI)
[![Dependencies](https://david-dm.org/anttiviljami/react-openapi-client.svg)](https://david-dm.org/anttiviljami/react-openapi-client)
[![npm version](https://img.shields.io/npm/v/react-openapi-client.svg)](https://www.npmjs.com/package/react-openapi-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-openapi-client?label=gzip%20bundle)](https://www.npmjs.com/package/react-openapi-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/anttiviljami/react-openapi-client/blob/master/LICENSE)
[![Sponsored](https://img.shields.io/badge/chilicorn-sponsored-brightgreen.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAMAAADjyg5GAAABqlBMVEUAAAAzmTM3pEn%2FSTGhVSY4ZD43STdOXk5lSGAyhz41iz8xkz2HUCWFFhTFFRUzZDvbIB00Zzoyfj9zlHY0ZzmMfY0ydT0zjj92l3qjeR3dNSkoZp4ykEAzjT8ylUBlgj0yiT0ymECkwKjWqAyjuqcghpUykD%2BUQCKoQyAHb%2BgylkAyl0EynkEzmkA0mUA3mj86oUg7oUo8n0k%2FS%2Bw%2Fo0xBnE5BpU9Br0ZKo1ZLmFZOjEhesGljuzllqW50tH14aS14qm17mX9%2Bx4GAgUCEx02JySqOvpSXvI%2BYvp2orqmpzeGrQh%2Bsr6yssa2ttK6v0bKxMBy01bm4zLu5yry7yb29x77BzMPCxsLEzMXFxsXGx8fI3PLJ08vKysrKy8rL2s3MzczOH8LR0dHW19bX19fZ2dna2trc3Nzd3d3d3t3f39%2FgtZTg4ODi4uLj4%2BPlGxLl5eXm5ubnRzPn5%2Bfo6Ojp6enqfmzq6urr6%2Bvt7e3t7u3uDwvugwbu7u7v6Obv8fDz8%2FP09PT2igP29vb4%2BPj6y376%2Bu%2F7%2Bfv9%2Ff39%2Fv3%2BkAH%2FAwf%2FtwD%2F9wCyh1KfAAAAKXRSTlMABQ4VGykqLjVCTVNgdXuHj5Kaq62vt77ExNPX2%2Bju8vX6%2Bvr7%2FP7%2B%2FiiUMfUAAADTSURBVAjXBcFRTsIwHAfgX%2FtvOyjdYDUsRkFjTIwkPvjiOTyX9%2FAIJt7BF570BopEdHOOstHS%2BX0s439RGwnfuB5gSFOZAgDqjQOBivtGkCc7j%2B2e8XNzefWSu%2BsZUD1QfoTq0y6mZsUSvIkRoGYnHu6Yc63pDCjiSNE2kYLdCUAWVmK4zsxzO%2BQQFxNs5b479NHXopkbWX9U3PAwWAVSY%2FpZf1udQ7rfUpQ1CzurDPpwo16Ff2cMWjuFHX9qCV0Y0Ok4Jvh63IABUNnktl%2B6sgP%2BARIxSrT%2FMhLlAAAAAElFTkSuQmCC)](http://spiceprogram.org/oss-sponsorship)
[![Buy me a coffee](https://img.shields.io/badge/donate-buy%20me%20a%20coffee-orange)](https://buymeacoff.ee/anttiviljami)

Consume OpenAPI-enabled APIs with React Hooks

Uses [`react-openapi-client`](https://www.npmjs.com/package/react-openapi-client) under the hood.

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
