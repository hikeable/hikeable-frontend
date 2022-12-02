import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import { Landing } from '../components'
import { Navbar } from '../components'


export default function Home() {

  function goToDashboard () {
    
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Aruku</title>
        <meta name="description" content="hiking japan" />
        <link rel="icon" href="/boots.png" />
      </Head>
      <Navbar isLoggedIn={true} navActive={true} user={''}/>
      <Landing/>

    </div>
  )
}
