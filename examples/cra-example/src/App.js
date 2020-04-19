import React, { useEffect } from 'react';
import { useOperation, OpenAPIProvider } from 'react-openapi-client';

const App = () => (
  <OpenAPIProvider definition="http://localhost:5001/openapi.json">
    <PetDetails id={1} />
  </OpenAPIProvider>
);

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

export default App;
