import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <script src="https://cdn.jsdelivr.net/gh/ka215/svg-japan@main/dist/svg-japan.min.js" />
    </>
  );
}
