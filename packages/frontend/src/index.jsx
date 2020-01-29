import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import store from './store/store';
import App from './components/app';
import './index.scss';
import apolloClient from './utils/apolloClient';

const app = (
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));
