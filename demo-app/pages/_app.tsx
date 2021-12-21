import '../styles/globals.css'
// import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import { FanNoiseProvider } from '../providers/fanNoise'
import { SocketConnectionProvider } from '../providers/socketConnection'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <SocketConnectionProvider>
    <Component {...pageProps} />
  </SocketConnectionProvider>
  )
}

export default MyApp
