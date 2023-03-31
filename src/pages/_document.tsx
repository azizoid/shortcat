import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Shortcat.ly is a URL shortener service that creates short, easy-to-remember URLs that redirect to any website or resource on the internet. Simplify your online presence with Shortcat.ly." />
        <link rel="icon" href="/favicon.ico" />
        {/* TODO: Google tag, analytics and other code here */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
