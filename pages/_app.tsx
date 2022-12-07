/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import { AuthProvider } from "../components/context/UserAuth";

import { useState } from "react";
import router from "next/router";

export default function App({ Component, pageProps, router }: AppProps) {
  

  const [navActive, setNavStatus] = useState(true);
  const [isLoggedIn, setLoggedStatus] = useState(true);


  // const getLayout = Component.getLayout ?? ((page) => page)

  // type NextPageWithLayout = NextPage & {
  //   getLayout?: (pageProps: AppProps, page: ReactElement) => ReactNode
  // }

  /**This gets passed to my _app.tsx file 
   * The function resides in each oage component. Layout template retrieved in _app.tsx
   * ***/
  
  // if (Component.getLayout) {
  //   return Component.getLayout(pageProps.data, <Component {...pageProps} />);
  // }
  // else {
  //   return <Component {...pageProps} />;
  // }

  
  if (router.pathname === "/" ){
    console.log("path--", router.pathname)
    return (
      <AuthProvider>
        <Navbar navActive={false} isLoggedIn={false} userName={''} logOff = {setLoggedStatus} />
        <Component {...pageProps} />
        <script src="https://cdn.jsdelivr.net/gh/ka215/svg-japan@main/dist/svg-japan.min.js" />
      </AuthProvider>
    )
  }

  console.log("not in root");
  return(
    <>
      <AuthProvider>
        <Navbar navActive={true} isLoggedIn={isLoggedIn} userName={'Matt'} logOff = {setLoggedStatus} />
        {/* getLayout(<Component {...pageProps} />) */}
        <Component {...pageProps}/>

          <Navbar navActive={true} isLoggedIn={isLoggedIn} userName={'Matt'} logOff = {setLoggedStatus} />
          <Component {...pageProps} />
          <script src="https://cdn.jsdelivr.net/gh/ka215/svg-japan@main/dist/svg-japan.min.js" />
        </AuthProvider>
    </>
  ) 
  
}
