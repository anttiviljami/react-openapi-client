import React, { FunctionComponent, useContext } from 'react';
import fs from 'fs';
import path from 'path';
import { OpenAPIProvider, OpenAPIContext } from '.';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OpenAPIClientAxios from 'openapi-client-axios';

jest.mock('openapi-client-axios');

const definition = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', '__tests__', 'resources', 'openapi.json')).toString(),
);

describe('OpenAPIProvider', () => {
  it('can be used as a component', () => {
    // given
    const props = { definition };

    // when
    const result = render(<OpenAPIProvider {...props} />);

    // then
    expect(result.container).toBeInTheDocument();
  });

  it('provides OpenAPIContext with reference to api to child components', () => {
    // given
    const props = { definition };
    let providedContext: { api: OpenAPIClientAxios };
    const TestComponent: FunctionComponent = jest.fn(() => {
      providedContext = useContext(OpenAPIContext);
      return <></>;
    });
    const renderFunction = TestComponent as jest.Mock;

    // when
    render(
      <OpenAPIProvider {...props}>
        <TestComponent />
      </OpenAPIProvider>,
    );

    // then
    expect(renderFunction).toBeCalled();
    expect(providedContext).toHaveProperty('api');
    expect(providedContext.api).toBeInstanceOf(OpenAPIClientAxios);
  });

  it('passes props as parameters to OpenAPIClientAxios constructor', () => {
    // given
    const props = { definition, strict: true, validate: true, axiosConfigDefaults: { withCredentials: true } };

    // when
    render(<OpenAPIProvider {...props} />);

    // then
    expect(OpenAPIClientAxios).toHaveBeenCalledWith(props);
  });
});
