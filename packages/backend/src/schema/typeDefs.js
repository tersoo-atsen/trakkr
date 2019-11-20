import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type User {
      id: Int!
      firstName: String!
      lastName: String!
      userName: String
      email: String
      password: String!
      items: [Item!]!
    }

    type Item {
      id: Int!
      name: String!
      description: String!
      location: String!
      imageUrl: String!
      value: Int!
      user: User!
    }

    type Activity {
      id: Int!
      name: String!
      user: User!
      item: Item!
    }

    type Query {
      getItem(id: Int!): Item
      getUser(id: Int!): User
      getUserActivities(userId: Int!): [Activity]
      getUserItems(userId: Int!): [Item]
      searchItems(search: String): [Item]!
    }

    type AuthResponse {
      token: String!
      user: User!
    }

    type Mutation {
      signUp(firstName: String!, lastName: String!, email: String!, password: String!, userName: String): AuthResponse
      signIn(login: String!, password: String!): AuthResponse
      updateUser(firstName: String, lastName: String, userName: String): User
      createItem(name: String!, description: String!, value: Int!, imageUrl: String!, location: String!): Item!
      updateItem(id: Int!, name: String, description: String): Item
      deleteItem(id: Int!): Boolean!
    }`

export default typeDefs
