import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'unfetch';

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
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
