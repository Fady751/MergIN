import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';
import store from './Store/Store'
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
    </StrictMode>
  </ApolloProvider>
);
