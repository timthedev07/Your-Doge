import { ApolloProvider } from "@apollo/client";
import { App } from "../pages/_app";
import { BACKEND } from "../constants/apollo";
import { generateApolloClient } from "../utils/clientGenerator";
import { getWithExpiry } from "../utils/localStorageExpiration";

const SERVER_ID = getWithExpiry("serverId") - 1;

export const shibe = generateApolloClient(BACKEND);
export const burrito = generateApolloClient(
  `${
    process.env.NODE_ENV === "development"
      ? `http://localhost:500${SERVER_ID}`
      : `http://homework-manager-db${SERVER_ID}.herokuapp.com`
  }`
);

export const unknownErrMsg =
  "Sorry, an unknown error occurred, try again later, or contact our support team(yourdoge.team@gmail.com)";

const ApolloWrapper: React.FC = () => {
  if (getWithExpiry("serverId")) {
    return (
      <ApolloProvider client={burrito}>
        <ApolloProvider client={shibe}>
          <App />
        </ApolloProvider>
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={shibe}>
      <App />
    </ApolloProvider>
  );
};
export default ApolloWrapper;
