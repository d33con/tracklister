import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "jotai";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}
