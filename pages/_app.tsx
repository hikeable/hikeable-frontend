/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { AuthProvider } from "../components/context/UserAuth";
import { useAuthContext } from "../components/context/UseAuthContext";
import Head from "next/head";

export default function App({ Component, pageProps, router }: AppProps) {
  const { user } = useAuthContext();

  console.log(user);

  const [navActive, setNavStatus] = useState(true);
  const [isLoggedIn, setLoggedStatus] = useState(false);

  if (router.pathname === "/") {
    console.log("path--", router.pathname);
    return (
      <>
        <Head>
        <title>Hikeable</title>
        <meta name="google-site-verification" content="nWR98aBPDqC_SSWMxT9iPYnqArKAhflslbq52Ko3LPE" />
        <meta name="description" content="Hikeable is a user driven app for planning hikes in japan and share useful information as comments, messages embedded in a map and photos for each trail" />
        <meta name="keywords" content="hiking, japan, advice"/>
        <link rel="icon" href="/boots.png" />
        </Head>
      <AuthProvider>
        <Navbar
          navActive={false}
          isLoggedIn={false}
          setLoggedStatus={setLoggedStatus}
          userName={""}
          logOff={setLoggedStatus}
          />
        <Component {...pageProps} />
        <script src="https://cdn.jsdelivr.net/gh/ka215/svg-japan@main/dist/svg-japan.min.js" />
      </AuthProvider>
          </>
    );
  }
  return (
    <>
    <Head>
        <title>Hikeable</title>
        <meta name="google-site-verification" content="nWR98aBPDqC_SSWMxT9iPYnqArKAhflslbq52Ko3LPE" />
        <meta name="description" content="Hikeable is a user driven app for planning hikes in japan and share useful information as comments, messages embedded in a map and photos for each trail" />
        <meta name="keywords" content="hiking, japan, advice"/>
        <link rel="icon" href="/boots.png" />
    </Head>
    <>
      <AuthProvider>
        <Navbar
          navActive={true}
          isLoggedIn={false}
          setLoggedStatus={setLoggedStatus}
          userName={""}
          logOff={setLoggedStatus}
          />
        <Component {...pageProps} />
        <script src="https://cdn.jsdelivr.net/gh/ka215/svg-japan@main/dist/svg-japan.min.js" />
      </AuthProvider>
          </>
    </>
  );
}
