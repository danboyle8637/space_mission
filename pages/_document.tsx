import Document, {
  DocumentContext,
  Head,
  Main,
  NextScript,
  Html,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content="Space Mission" />
          <meta name="apple-modile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Space Mission" />
          <meta
            name="description"
            content="Are you ready for a dangerous space mission?"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#1A1A2E" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#1A1A2E" />

          {/* <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" /> */}
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/icons/space-mission-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/space-mission-icon-180x180.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/icons/space-mission-icon-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="384x384"
            href="/icons/space-mission-icon-384x384"
          />
          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href="/icons/space-mission-icon-512x512"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/icons/space-mission-icon-120x120.png"
            color="#1A1A2E"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="portal" />
        </body>
      </Html>
    );
  }
}
