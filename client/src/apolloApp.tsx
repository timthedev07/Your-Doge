import { ApolloProvider } from "@apollo/client";
import { App } from "./App";
import { BACKEND } from "./constants/apollo";
import { generateApolloClient } from "./utils/clientGenerator";

export const authClient = generateApolloClient(BACKEND);

export const unknownErrMsg =
  "Sorry, an unknown error occurred, try again later, or contact our support team(yourdoge.team@gmail.com)";

export const ApolloApp: React.FC = () => {
  return (
    <ApolloProvider client={authClient}>
      <App />
    </ApolloProvider>
  );
};
