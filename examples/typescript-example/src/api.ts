/**
 * GENERATED
 */

import {
  OpenAPIProvider,
  useOperation as useOperationOrig,
  useOperationMethod as useOperationMethodOrig,
  UnknownOperationMethod,
  ResponseObject,
} from 'react-openapi-client';
import { OperationMethods, Paths } from './client';

function useOperationMethod(operationId: string): [UnknownOperationMethod, ResponseObject<any>];
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
