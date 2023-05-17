import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "semantic-ui-css/semantic.min.css";
import Layout from "@/components/Layout/Layout";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}
