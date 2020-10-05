import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { createUploadLink } from "apollo-upload-client";
export const dev = false;
const LINK = dev ? "http://localhost:3001" : "https://rollawer.com";
const SUB_LINK = dev
  ? "ws://localhost:3001/api/subscriptions"
  : "wss://rollawer.com/api/subscriptions";
const httpLink = createUploadLink({
  uri: LINK + "/api/graphql",
  credentials: "include",
});

const wsLink = new WebSocketLink({
  uri: SUB_LINK,
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
