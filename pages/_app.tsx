/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import router from "next/router";
import { Navbar } from "../components/Navbar";
import { useState, ReactElement, ReactNode } from "react";
import { NextPage } from 'next'


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout,

}

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
    console.log("in root");
    return (
      <>
        <Navbar navActive={false} isLoggedIn={false} userName={''} logOff = {setLoggedStatus} />
        <Component {...pageProps} />
        <script src="https://cdn.jsdelivr.net/gh/ka215/svg-japan@main/dist/svg-japan.min.js" />

      </>
    )
  }

  console.log("not in root");
  return(
    <>
        <Navbar navActive={true} isLoggedIn={isLoggedIn} userName={'Matt'} logOff = {setLoggedStatus} />
        {/* getLayout(<Component {...pageProps} />) */}
        <Component {...pageProps}/>

        <script src="https://cdn.jsdelivr.net/gh/ka215/svg-japan@main/dist/svg-japan.min.js" />
    </>
  ) 
  
}
