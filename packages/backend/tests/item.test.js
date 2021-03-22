import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

import resolvers from '../src/schema/resolvers';
import typeDefs from '../src/schema/typeDefs';
import models from '../src/database/models';
import {
  singleItem, newItem, deleteItem, deleteNonexistentItem, updateNonexistentItem, updateItem,
} from './cases/item';
import { signIn } from './cases/user';

describe('Item Test Cases', () => {
  const itemTestCases = [
    newItem, updateNonexistentItem, updateItem, deleteItem, singleItem, deleteNonexistentItem,
  ];
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  itemTestCases.forEach((obj) => {
    const {
      id, query, variables, expected,
    } = obj;

    test(`${id}`, async () => {
      let me;
      if (id === 'Should add a new item' || id === 'Should remove item by id' || id === 'Should not remove non-existent item') {
        const context = { models, secret: process.env.JWT_SECRET };
        const result = await graphql(schema, signIn.query, null, context, signIn.variables);
        const { data: { signIn: { user } } } = result;
        me = user;
      }
      const result = await graphql(schema, query, null, { models, me }, variables);
      if (id === 'Should not remove non-existent item') {
        return expect(result.errors[0].message).toEqual('Item not found!');
      }
      if (id === 'Should not update non-existent item') {
        return expect(result.errors[0].message).toEqual('Item not found!');
      }
      return expect(result).toEqual(expected);
    });
  });

  test(`${newItem.id} with no authentication`, async () => {
    const result = await graphql(schema, newItem.query, null, { models }, newItem.variables);
    return expect(result.errors[0].message).toEqual('You are not signed in.');
  });

  test(`${deleteItem.id} with not authorization`, async () => {
    const context = { models, secret: process.env.JWT_SECRET };
    const variables = {
      login: 'jane.doe@example.com',
      password: 'applicationUser2',
    };
    const signInResult = await graphql(schema, signIn.query, null, context, variables);
    const { data: { signIn: { user } } } = signInResult;
    const vars = { id: 1 };
    const result = await graphql(
      schema,
      deleteItem.query,
      null, { models, me: user },
      vars,
    );
    return expect(result.errors[0].message).toEqual('You are cannnot perform this action.');
  });
});
