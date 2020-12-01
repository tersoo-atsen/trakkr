import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

import resolvers from '../src/schema/resolvers';
import typeDefs from '../src/schema/typeDefs';
import models from '../src/database/models';
import { search } from './cases/search';

describe('Search Test Cases', () => {
  const searchTestCase = [search];
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  searchTestCase.forEach((obj) => {
    const {
      id, query, variables, expected,
    } = obj;

    test(`${id}`, async () => {
      const result = await graphql(schema, query, null, { models }, variables);

      return expect(result).toEqual(expected);
    })
  })
})
