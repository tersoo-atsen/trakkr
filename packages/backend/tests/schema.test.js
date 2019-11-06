import { graphql } from 'graphql';

import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer,
} from 'graphql-tools';

import typeDefs from '../src/config/schema/typeDefs';
import { schema } from './cases/schema';

describe('Schema', () => {
  // Array of case types
  const cases = [schema];
  const mockSchema = makeExecutableSchema({ typeDefs });

  // Here we specify the return payloads of mocked types
  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      User: () => ({
        id: 1,
        email: 'John.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
      }),
    },
  });

  test('has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(typeDefs);

      await MockServer.query('{ __schema { types { name } } }');
    }).not.toThrow();
  });

  cases.forEach((obj) => {
    const {
      id, query, variables, context: ctx, expected,
    } = obj;

    test(`${id}`, async () => {
      expect(
        graphql(mockSchema, query, null, { ctx }, variables),
      ).resolves.toEqual(expected);
    });
  });
});
