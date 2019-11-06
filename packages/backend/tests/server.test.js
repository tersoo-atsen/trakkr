import request from 'supertest';
import app from '../src/app';

describe('Test the server', () => {
  test('responds to /', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      })
  });

  test('responds to /', (done) => {
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
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
});
