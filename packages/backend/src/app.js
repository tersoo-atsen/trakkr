import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import { resolvers, typeDefs } from './schema';
import models from './database/models'
import { getMe } from './utils/getMe';

const app = express();

app.use(bodyParser.json(), cors());
app.use(express.static(path.join(__dirname, '../../frontend/build')))

app.get('/api', (req, res) => {
  res.status(200).send('Welcome to the trakkr graphql api server!')
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'))
});

const server = new ApolloServer({
  introspection: true,
  playground: true,
  uploads: false,
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const secret = process.env.JWT_SECRET;
    const me = await getMe(req, secret);
    return { models, me, secret };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

export default app;
