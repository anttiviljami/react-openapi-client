import React from 'react';
import { useOperation, useOperationMethod, OpenAPIProvider } from 'react-openapi-client';

const App = () => (
  <OpenAPIProvider definition="http://localhost:5001/openapi.json">
    <PetDetails id={1} />
  </OpenAPIProvider>
);

const PetDetails = (props) => {
  // useOperation is called right away as an effect
  const { loading, error, data } = useOperation('getPetById', props.id);

  // useOperationMethod returns a method you can call
  const [deletePetById, deleteState] = useOperationMethod('deletePetById');

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
      <button onClick={() => deletePetById(data.id)} disabled={deleteState.loading}>
        Delete
      </button>
      {deleteState.response && <p>Success!</p>}
      {deleteState.error && <p>Error deleting pet: {deleteState.error}</p>}
    </div>
  );
};

export default App;
