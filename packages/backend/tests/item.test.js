import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

import resolvers from '../src/config/schema/resolvers';
import typeDefs from '../src/config/schema/typeDefs';
import models from '../src/database/models';
import { singleItem, newItem, deleteItem } from './cases/item';
import { signIn } from './cases/user';

describe('Item Test Cases', () => {
  const itemTestCases = [newItem, deleteItem, singleItem];
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  itemTestCases.forEach((obj) => {
    const {
      id, query, variables, expected,
    } = obj;

    test(`${id}`, async () => {
      let me;
      if (id === 'new item') {
        const context = { models, secret: process.env.JWT_SECRET };
        const result = await graphql(schema, signIn.query, null, context, signIn.variables);
        const { data: { signIn: { user } } } = result;
        me = user;
      }

      const result = await graphql(schema, query, null, { models, me }, variables);
      return expect(result).toEqual(expected);
    });
  });

  test(`${newItem.id} with no authentication`, async () => {
    const result = await graphql(schema, newItem.query, null, { models }, newItem.variables);
    return expect(result.errors[0].message).toEqual('Not authenticated as user.');
  });
});
