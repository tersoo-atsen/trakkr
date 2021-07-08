import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer, Slide } from 'react-toastify';

import storeConfig from './store/store';
import App from './components/app';
import './index.scss';
import { apolloClient } from './utils';
import './utils/fontawesome';

const app = (
  <>
    <ToastContainer
      transition={Slide}
      position="top-right"
      autoClose={4000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <ApolloProvider client={apolloClient}>
      <Provider store={storeConfig().store}>
        <PersistGate loading={null} persistor={storeConfig().persistor}>
          <Router>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </>
);

ReactDOM.render(app, document.getElementById('root'));
