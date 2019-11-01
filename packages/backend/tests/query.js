export const user = `query GetUser($id: Int!){
  getUser(id: $id) {
    id
    firstName
    lastName
    items{
      id
      name
      description
    }
  }
}`;

export const getUserItems = `{
  getUserItems(userId: 1) {
    id
    description
    name
  }
}`;
