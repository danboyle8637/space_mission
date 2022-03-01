import { useEffect } from "react";
import { AppProps } from "next/app";

import Layout from "../src/Layouts/BaseLayout";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const unregisterServiceWorker = async () => {
      if (navigator && "serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (let i = 0; i < registrations.length; i++) {
          registrations[i].unregister();
        }
      }
    };

    unregisterServiceWorker();
  }, []);

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
