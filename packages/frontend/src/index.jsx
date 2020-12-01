import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { PersistGate } from 'redux-persist/integration/react';

import storeConfig from './store/store';
import App from './components/app';
import './index.scss';
import { apolloClient } from './utils';


const app = (
  <ApolloProvider client={apolloClient}>
    <Provider store={storeConfig().store}>
      <PersistGate loading={null} persistor={storeConfig().persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));
