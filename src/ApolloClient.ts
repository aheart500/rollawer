import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { createUploadLink } from "apollo-upload-client";
const httpLink = createUploadLink({
  uri: "http://localhost:3001/api/graphql",
  credentials: "include",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:3001/api/subscriptions",
  options: {
    reconnect: true,
  },
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
export default new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
