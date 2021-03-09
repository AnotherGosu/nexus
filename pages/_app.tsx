import { AppProps } from "next/app";
import { AuthProvider } from "../utils/auth";
import { ChakraProvider, theme } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
