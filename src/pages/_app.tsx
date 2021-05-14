import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../libs/apollo-client";
import { parseBooleanEnvVar } from "../../utils";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";

if (parseBooleanEnvVar(process.env.NEXT_PUBLIC_API_MOCKS_ENABLED, false)) {
  console.log(
    "Mocks can't be enabled for the moment on NextJS due to : https://github.com/mswjs/msw/issues/642"
  );
  // require("../mocks");
}

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
