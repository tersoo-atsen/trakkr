import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

import resolvers from '../src/config/schema/resolvers';
import typeDefs from '../src/config/schema/typeDefs';
import models from '../src/database/models';
import {
  singleUserTestCase,
  userItemsTestCase,
  userActivitiesCase,
  newUser,
} from './cases/user';

describe('User Test Cases', () => {
  // array of all test cases, just 1 for now
  const userCases = [singleUserTestCase, userItemsTestCase, userActivitiesCase, newUser];
  // reading the actual schema
  // make the actual schema and resolvers executable
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // running the test for each case in the cases array
  userCases.forEach((obj) => {
    const {
      id, query, variables, expected,
    } = obj

    test(`returns a ${id}`, async () => {
      const result = await graphql(schema, query, null, { models }, variables);
      return expect(result).toEqual(expected);
    });
  });
});
