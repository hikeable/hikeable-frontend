import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '../components'
import { useState } from 'react';

export default function App({ Component, pageProps, router }: AppProps) {

  const [navActive, setNavStatus] = useState(true);
  const [isLoggedIn, setLoggedStatus] = useState(true);

  console.log("status of isloggedIn is: ", isLoggedIn)

  if (router.pathname === "/" ){
    console.log("in root");
    return (
      <>
        <Navbar navActive={false} isLoggedIn={false} userName={''} logOff = {setLoggedStatus} />
        <Component {...pageProps} />
      </>
    )
  }

  return(
    <>
        <Navbar navActive={navActive} isLoggedIn={isLoggedIn} userName={'Matt'} logOff = {setLoggedStatus} />
        <Component {...pageProps} />
    </>
  ) 


}
