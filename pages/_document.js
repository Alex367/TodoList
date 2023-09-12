import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <div id="notify-root"></div>
      </body>
    </Html>
  );
}
