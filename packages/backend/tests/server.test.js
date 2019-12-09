import request from 'supertest';
import app from '../src/app';

describe('Test the server', () => {
  test('responds to /', (done) => {
    request(app)
      .get('/api')
      .end((err, res) => {
        expect(res.statusCode).toBe(200);
        done();
      })
  });

  test('responds with index page for any other get requests', (done) => {
    request(app)
      .get('/foo')
      .end((err, res) => {
        expect(res.header['content-type']).toContain('text/html');
        done();
      })
  })

  test('responds to /api', (done) => {
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
