import Head from 'next/head'
import Image from 'next/image'
import { Landing } from '../components'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Aruku</title>
        <meta name="description" content="hiking japan" />
        <link rel="icon" href="/icons8-boots-16.png" />
      </Head>

      <Landing></Landing>

      

    


      
    </div>
  )
}
