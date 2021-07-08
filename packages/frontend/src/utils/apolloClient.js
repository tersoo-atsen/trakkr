import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'unfetch';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { getToken } from './helpers';

const BASE_URL = process.env.TRAKKR_API_URL;
const token = getToken();
const httpLink = new HttpLink({
  uri: BASE_URL,
  headers: {
    authorization: token ? `Bearer ${token}` : '',
  },
  fetch,
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5000/graphql',
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  connectToDevTools: true,
  link,
  cache: new InMemoryCache(),
});

export default apolloClient;
