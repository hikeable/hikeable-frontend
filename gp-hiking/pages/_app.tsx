import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '../components'

export default function App({ Component, pageProps }: AppProps) {

  return(


    <>
      <Navbar isLoggedIn={true} navActive={true} user={''} />
        <Component {...pageProps} />
    </>
  ) 


}
