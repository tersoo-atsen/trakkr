import { ApolloServer } from 'apollo-server-express';

import app from './app';
import { resolvers, typeDefs } from './config/schema';
import models from './database/models'

const port = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
});

server.applyMiddleware({ app });

app.listen(port);
