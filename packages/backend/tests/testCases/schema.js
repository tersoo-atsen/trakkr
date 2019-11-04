
export const schema = {
  id: 'scheme',
  query: `
    query GetUser($id: Int!){
      getUser(id: $id) {
        id
        firstName
        lastName
        email
      }
    }
  `,
  variables: { id: 1 },
  context: {},
  expected: {
    data: {
      getUser: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'John.doe@example.com',
      },
    },
  },
};
