import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink,
} from "@apollo/client";
import { GRAPHQL_URI } from "~constants/constants.config";
import { TWrapperProps } from "~utils/mixins.type";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) =>
      console.log(`[GraphQL error]: Message: ${message}`),
    );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({ uri: GRAPHQL_URI, credentials: "include" });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
});

export function ApolloClientProvider({ children }: TWrapperProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
