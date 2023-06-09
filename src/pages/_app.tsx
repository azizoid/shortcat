import '@/styles/globals.css'
import { NavbarRow } from '@/components'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <div className="container">
    <NavbarRow />

    <Component {...pageProps} />
  </div>
}
