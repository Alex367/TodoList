import store from "@/store/modal-redux";
import "../styles/normalize.css";
import "./_app.css";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/layout/Layout";
import { usePathname } from "next/navigation";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const pathname = usePathname();
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Head>
          <title>Todo Application</title>
          <meta name="description" content="Todo List application" />
          <meta name="keywords" content="HTML, CSS, JavaScript" />
          <meta name="author" content="Aleksandr Liskov" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        {pathname === "/" ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </Provider>
    </SessionProvider>
  );
}
