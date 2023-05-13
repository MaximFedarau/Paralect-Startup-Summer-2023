import "@styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

import { Layout } from "@components";

export default function App({ Component, ...pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
