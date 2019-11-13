import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

import resolvers from '../src/config/schema/resolvers';
import typeDefs from '../src/config/schema/typeDefs';
import models from '../src/database/models';
import {
  singleItem, newItem, deleteItem, deleteNonexistentItem,
} from './cases/item';
import { signIn, signUp } from './cases/user';

describe('Item Test Cases', () => {
  const itemTestCases = [newItem, deleteItem, singleItem, deleteNonexistentItem];
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  itemTestCases.forEach((obj) => {
    const {
      id, query, variables, expected,
    } = obj;

    test(`${id}`, async () => {
      let me;
      if (id === 'new item' || id === 'remove item' || id === 'remove non-existent item') {
        const context = { models, secret: process.env.JWT_SECRET };
        const result = await graphql(schema, signIn.query, null, context, signIn.variables);
        const { data: { signIn: { user } } } = result;
        me = user;
      }

      const result = await graphql(schema, query, null, { models, me }, variables);
      if (id === 'remove non-existent item') {
        return expect(result.errors[0].message).toEqual('Item not found!');
      }
      return expect(result).toEqual(expected);
    });
  });

  test(`${newItem.id} with no authentication`, async () => {
    const result = await graphql(schema, newItem.query, null, { models }, newItem.variables);
    return expect(result.errors[0].message).toEqual('Not authenticated as user.');
  });

  test(`${deleteItem.id} with not authorization`, async () => {
    const context = { models, secret: process.env.JWT_SECRET };
    const variables = {
      firstName: 'Test', lastName: 'User', email: 'test.user@example.com', password: 'testUser1', userName: 'testUser1',
    };
    const signUpResult = await graphql(schema, signUp.query, null, context, variables);
    const { data: { signUp: { user } } } = signUpResult;
    const vars = { id: 1 };
    const result = await graphql(
      schema,
      deleteItem.query,
      null, { models, me: user },
      vars,
    );
    return expect(result.errors[0].message).toEqual('Not authenticated as owner.');
  });
});
