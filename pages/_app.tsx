/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import router from "next/router";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { AuthProvider } from "../components/context/UserAuth";

export default function App({ Component, pageProps, router }: AppProps) {
  

  const [navActive, setNavStatus] = useState(true);
  const [isLoggedIn, setLoggedStatus] = useState(true);

  
  if (router.pathname === "/" ){
    return (
      <AuthProvider>
        <Navbar navActive={false} isLoggedIn={false} userName={''} logOff = {setLoggedStatus} />
        <Component {...pageProps} />
        <script src="https://cdn.jsdelivr.net/gh/ka215/svg-japan@main/dist/svg-japan.min.js" />

      </AuthProvider>
    )
  }

  return(
    <>
        <Navbar navActive={true} isLoggedIn={isLoggedIn} userName={'Matt'} logOff = {setLoggedStatus} />
        <Component {...pageProps} />

        <script src="https://cdn.jsdelivr.net/gh/ka215/svg-japan@main/dist/svg-japan.min.js" />
    </>
  ) 
  
}
