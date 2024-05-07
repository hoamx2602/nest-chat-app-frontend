import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { API_URL } from "./url";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { snackVar } from "./snack";
import { UNKNOW_ERROR_SNACK_MESSAGE } from "./error";

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
    snackVar(UNKNOW_ERROR_SNACK_MESSAGE)
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([logoutLink, httpLink]),
});

export default client;
