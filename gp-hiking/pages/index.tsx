import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import { Landing, Navbar } from '../components'
import { useEffect, useRef, useState } from 'react'


export default function Home() {

  const [navActive, setNavStatus] = useState("true");
  const [userName, setName] = useState("");


  useEffect(() => {

  }, [navActive])



  return (
    
    <div className={styles.container}>
      <Head>
        <title>Aruku</title>
        <meta name="description" content="hiking japan" />
        <link rel="icon" href="/boots.png" />
      </Head>
      <Landing/>
      
      {
        Boolean(navActive) === true? (
            <Navbar navActive={true} isLoggedIn={false} userName={userName}/>
        ): <Navbar navActive={false} isLoggedIn={false} userName={''}/>
      }
      
      



    </div>
  )
}
