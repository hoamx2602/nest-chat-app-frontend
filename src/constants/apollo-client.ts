import { ApolloClient, HttpLink, InMemoryCache, from, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { API_URL, WS_URL } from "./url";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { snackVar } from "./snack";
import { UNKNOW_ERROR_SNACK_MESSAGE } from "./error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const logoutLink = onError(({ graphQLErrors, networkError }) => {
  if (
    graphQLErrors?.length &&
    (graphQLErrors[0].extensions.originalError as any).statusCode === 401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }

  if (networkError) {
    snackVar(UNKNOW_ERROR_SNACK_MESSAGE);
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });
const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WS_URL}/graphql`,
  })
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
// * refer: https://www.apollographql.com/docs/react/data/subscriptions/#3-split-communication-by-operation-recommended
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export default client;
