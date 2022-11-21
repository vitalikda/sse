import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UrqlProvider, urqlClient } from '../graphql/urql'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={urqlClient}>
      <Component {...pageProps} />
    </UrqlProvider>
  )
}
