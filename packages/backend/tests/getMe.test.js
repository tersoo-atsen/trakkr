import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import request from 'supertest';

import app from '../src/app';
import resolvers from '../src/schema/resolvers';
import typeDefs from '../src/schema/typeDefs';
import models from '../src/database/models';
import { signIn } from './cases/user';

describe('getMe function unit test', () => {
  let testToken;
  beforeEach(async () => {
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const secret = process.env.JWT_SECRET;
    const context = { models, secret };
    const signInRes = await graphql(schema, signIn.query, null, context, signIn.variables);
    const { data: { signIn: { token } } } = signInRes;
    testToken = token;
  })

  test('should accept a valid token', async (done) => {
    const query = {
      query: `{
        getUser(id: 1) {
          id
          firstName
          lastName
          email
          items{
            id
            name
            description
            value
          }
        }
      }`,
    };

    request(app)
      .post('/graphql')
      .send(query)
      .set('authorization', `Bearer ${testToken}`)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      })
  });

  test('should reject an invalid token', async (done) => {
    const query = {
      query: `{
        getUser(id: 1) {
          id
          firstName
          lastName
          email
          items{
            id
            name
            description
            value
          }
        }
      }`,
    };

    request(app)
      .post('/graphql')
      .send(query)
      .set('authorization', `Bearer ${testToken}ss`)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.errors[0].message).toEqual('Context creation failed: Your session has expired. Sign in again.');
        done();
      })
  });
});
