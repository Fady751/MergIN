import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_HTTP,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_GRAPHQL_WS,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  })
);

const splitLink = split(
  ({ query }) => {
    if (!query) return false;
    const definition = getMainDefinition(query);
    return definition?.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
