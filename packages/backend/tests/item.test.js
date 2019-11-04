import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

import resolvers from '../src/config/schema/resolvers';
import typeDefs from '../src/config/schema/typeDefs';
import models from '../src/database/models';
import { itemCases, newItem, deleteItem } from './cases/item';

describe('Item Test Cases', () => {
  const itemTestCases = [itemCases, newItem, deleteItem];
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  itemTestCases.forEach((obj) => {
    const {
      id, query, variables, expected,
    } = obj;

    test(`returns a ${id}`, async () => {
      const result = await graphql(schema, query, null, { models }, variables);
      return expect(result).toEqual(expected);
    })
  });
});
