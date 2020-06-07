/**
 * GENERATED
 */

import {
  Parameters as ApiParameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
  OpenAPIProvider,
  useOperation as useOperationOrig,
  useOperationMethod as useOperationMethodOrig,
  UnknownOperationMethod,
  ResponseObject,
} from 'react-openapi-client';

declare namespace Components {
  namespace Responses {
    export type ListPetsRes = Schemas.Pet[];
    export type PetRes = Schemas.Pet;
  }
  namespace Schemas {
    export interface Pet {
      id?: number;
      /**
       * example:
       * Odie
       */
      name?: string;
      status?: 'AVAILABLE' | 'NOT_AVAILABLE';
      /**
       * example:
       * https://vignette.wikia.nocookie.net/garfield/images/a/ac/OdieCharacter.jpg/revision/latest/top-crop/width/360/height/450
       */
      image?: string; // uri
    }
  }
}
declare namespace Paths {
  namespace DeletePetById {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
  }
  namespace GetPetById {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export type $200 = Components.Responses.PetRes;
    }
  }
  namespace ListPets {
    namespace Responses {
      export type $200 = Components.Responses.ListPetsRes;
    }
  }
}

export interface OperationMethods {
  /**
   * listPets
   */
  listPets(
    parameters?: ApiParameters<UnknownParamsObject>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.ListPets.Responses.$200>;
  /**
   * getPetById
   */
  getPetById(
    parameters?: ApiParameters<Paths.GetPetById.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.GetPetById.Responses.$200>;
  /**
   * deletePetById
   */
  deletePetById(
    parameters?: ApiParameters<Paths.DeletePetById.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<any>;
}

export interface PathsDictionary {
  ['/pets']: {
    /**
     * listPets
     */
    get(
      parameters?: ApiParameters<UnknownParamsObject>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.ListPets.Responses.$200>;
  };
  ['/pets/{id}']: {
    /**
     * getPetById
     */
    get(
      parameters?: ApiParameters<Paths.GetPetById.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.GetPetById.Responses.$200>;
    /**
     * deletePetById
     */
    post(
      parameters?: ApiParameters<Paths.DeletePetById.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<any>;
  };
}

function useOperationMethod(
  operationId: 'listPets',
): [OperationMethods['listPets'], ResponseObject<Paths.ListPets.Responses.$200>];
function useOperationMethod(
  operationId: 'getPetById',
): [OperationMethods['getPetById'], ResponseObject<Paths.GetPetById.Responses.$200>];
function useOperationMethod(operationId: 'deletePetById'): [OperationMethods['deletePetById'], ResponseObject<any>];

function useOperationMethod(operationId: string) {
  return useOperationMethodOrig(operationId) as unknown;
}

function useOperation(
  operationId: 'listPets',
  ...params: Parameters<OperationMethods['listPets']>
): ResponseObject<Paths.ListPets.Responses.$200>;
function useOperation(
  operationId: 'getPetById',
  ...params: Parameters<OperationMethods['getPetById']>
): ResponseObject<Paths.GetPetById.Responses.$200>;
function useOperation(
  operationId: 'deletePetById',
  ...params: Parameters<OperationMethods['deletePetById']>
): ResponseObject<any>;

function useOperation(operationId: string, ...params: any) {
  return useOperationOrig(operationId, ...(params as Parameters<UnknownOperationMethod>)) as unknown;
}

export { OpenAPIProvider, useOperation, useOperationMethod };
