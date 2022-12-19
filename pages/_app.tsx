/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { AuthProvider } from "../components/context/UserAuth";
import { useAuthContext } from "../components/context/UseAuthContext";
import { User } from "firebase/auth";

import router from "next/router";

export default function App({ Component, pageProps, router }: AppProps) {
  const { user } = useAuthContext();

  console.log(user);

  const [navActive, setNavStatus] = useState(true);
  const [isLoggedIn, setLoggedStatus] = useState(false);

  if (router.pathname === "/") {
    console.log("path--", router.pathname);
    return (
      <>
      <title>Hikeable</title>
        <meta name="description" content="Hikeable is a user driven app for planning hikes in japan and share useful information as comments, messages embedded in a map and photos for each trail" />
        <meta name="keywords" content="hiking, japan, advice"/>
        {/* <link rel="icon" href="/favicon.ico" />  */}
        <link rel="icon" href="/boots.png" />
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
  console.log("router.pathname =======", router.pathname, user); // just to clarify which route is on display.
  return (
    <>
    <title>Hikeable</title>
        <meta name="description" content="hiking japan" />
        <link rel="icon" href="/boots.png" /> 
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
