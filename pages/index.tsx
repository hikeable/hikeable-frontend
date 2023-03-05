"use client";

import Head from "next/head";
import { Landing } from "../components";
import { useEffect, useState } from "react";

export default function Home() {
  const [navActive, setNavStatus] = useState("true");

  useEffect(() => {}, [navActive]);

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
