import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

import resolvers from '../src/schema/resolvers';
import typeDefs from '../src/schema/typeDefs';
import models from '../src/database/models';
import { cloudinarySignature } from './cases/cloudinarySignature';

describe('Cloudinary Signature Test Cases', () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const context = { models, secret: process.env.JWT_SECRET };
  const {
    id, query, variables,
  } = cloudinarySignature;

  test(`${id}`, async () => {
    const result = await graphql(schema, query, null, context, variables);
    expect(result.data.getSignature.signature).toBeDefined();
    expect(result.data.getSignature.timestamp).toBeDefined();
    return true;
  });
})
