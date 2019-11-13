import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

import resolvers from '../src/config/schema/resolvers';
import typeDefs from '../src/config/schema/typeDefs';
import models from '../src/database/models';
import {
  singleUserTestCase,
  userItemsTestCase,
  userActivitiesCase,
  signUp,
  signIn,
  signInUserNotFound,
  signInInvalidPassword,
  updateUser,
} from './cases/user';

describe('User Test Cases', () => {
  // array of all test cases, just 1 for now
  const userCases = [
    singleUserTestCase,
    userItemsTestCase,
    userActivitiesCase,
    signUp,
    signIn,
    updateUser,
  ];
  // reading the actual schema
  // make the actual schema and resolvers executable
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  let context = { models, secret: process.env.JWT_SECRET };
  const testToken = process.env.TEST_TOKEN;
  // running the test for each case in the cases array
  userCases.forEach((obj) => {
    const {
      id, query, variables, expected,
    } = obj;

    test(`${id}`, async () => {
      let me;
      if (id === 'update user') {
        const signResult = await graphql(schema, signIn.query, null, context, signIn.variables);
        const { data: { signIn: { user } } } = signResult;
        me = user;
        context = {
          ...context,
          me,
        }
      }
      const result = await graphql(schema, query, null, context, variables);
      if (result.data.signUp) {
        result.data.signUp.token = testToken;
      }
      if (result.data.signIn) {
        result.data.signIn.token = testToken;
      }

      return expect(result).toEqual(expected);
    });
  });

  const {
    id, query, variables,
  } = signInUserNotFound;

  test(`${id}`, async () => {
    const result = await graphql(schema, query, null, context, variables);
    expect(result.errors[0].message).toEqual('No user found with this login credentials.');
  });

  test(`${signInInvalidPassword.id}`, async () => {
    const result = await graphql(
      schema, signInInvalidPassword.query, null, context, signInInvalidPassword.variables,
    );
    expect(result.errors[0].message).toEqual('Invalid password.');
  });
});
