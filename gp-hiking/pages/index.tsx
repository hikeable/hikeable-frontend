import Head from 'next/head'
import { Landing } from '../components'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Aruku</title>
        <meta name="description" content="hiking japan" />
        <link rel="icon" href="/boots.png" />
        
      </Head>
      <Landing/>


    </div>

  )
}
