import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

import resolvers from '../src/schema/resolvers';
import typeDefs from '../src/schema/typeDefs';
import models from '../src/database/models';
import {
  today,
  singleUser,
  userItems,
  userActivities,
  signUp,
  signIn,
  signInUserNotFound,
  signInInvalidPassword,
  updateUser,
  userStats,
} from './cases/user';

describe('User Test Cases', () => {
  // array of all test cases, just 1 for now
  const userCases = [
    singleUser,
    userItems,
    userActivities,
    signUp,
    signIn,
    updateUser,
  ];
  // reading the actual schema
  // make the actual schema and resolvers executable
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  let context = { models, secret: process.env.JWT_SECRET };
  const testToken = process.env.TEST_TOKEN;
  // running the test for each case in the userCases array
  userCases.forEach((obj) => {
    const {
      id, query, variables, expected,
    } = obj;

    test(`${id}`, async () => {
      let me;
      if (id === 'Should complete user update') {
        const signResult = await graphql(schema, signIn.query, null, context, signIn.variables);
        const { data: { signIn: { user } } } = signResult;
        me = user;
        context = {
          ...context,
          me,
        }
      }
      const result = await graphql(schema, query, null, context, variables);

      if (result.data.getUserActivities) {
        result.data.getUserActivities.results.map(
          (activity) => (activity.createdAt = today),
        );
      }
      if (result.data.signUp) {
        result.data.signUp.token = testToken;
      }
      if (result.data.signIn) {
        result.data.signIn.token = testToken;
      }
      return expect(result).toEqual(expected);
    });
  });

  const { id, query, variables } = signInUserNotFound;

  test(`${id}`, async () => {
    const result = await graphql(schema, query, null, context, variables);
    expect(result.errors[0].message).toEqual('Invalid login. Please try again.');
  });

  test(`${signInInvalidPassword.id}`, async () => {
    const result = await graphql(
      schema, signInInvalidPassword.query, null, context, signInInvalidPassword.variables,
    );
    expect(result.errors[0].message).toEqual('Login failed. Please try again.');
  });

  test(`${userStats.id}`, async () => {
    const result = await graphql(
      schema, userStats.query, null, context, null,
    );
    return expect(result).toEqual(userStats.expected);
  });
});
