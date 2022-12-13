import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
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
