import "@styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Layout } from "@components";
import { store, persistor } from "@store";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MantineProvider
          theme={{
            colors: {
              grey: [
                "#FFFFFF",
                "#F5F5F6",
                "#EAEBED",
                "#D5D6DC",
                "#ACADB9",
                "#7B7C88",
                "#232134",
              ],
              blue: [
                "#DEECFF",
                "#C9E0FF",
                "#B7D6FF",
                "#92C1FF",
                "#5E96FC",
                "#5E96FC",
              ],
            },
          }}
        >
          <Layout>
            <style jsx global>{`
              html {
                font-family: ${inter.style.fontFamily};
              }
            `}</style>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </PersistGate>
    </Provider>
  );
}
