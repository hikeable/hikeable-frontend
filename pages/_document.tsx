import { Html, Head, Main, NextScript } from "next/document";

{/* <a href="https://www.flaticon.com/free-icons/boots" title="boots icons">Boots icons created by Freepik - Flaticon</a> */}

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <title>Hikeable</title>
        <meta name="description" content="hiking japan" />
        <link rel="icon" href="/boots.png" />  */}
        
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css"
          type="text/css"
        />

      </Head>
      <body>
      <script
        src="https://product-gallery.cloudinary.com/all.js" async
        type="text/javascript"
        ></script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
