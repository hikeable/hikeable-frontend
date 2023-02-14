import Head from "next/head";
import { Landing } from "../components";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hikeable</title>
        <link rel="icon" href="/greenboots.png" />
      </Head>
      <Landing />
    </div>
  );
}
