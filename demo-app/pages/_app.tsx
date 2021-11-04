import '../styles/globals.css'
// import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import { FanNoiseProvider } from '../providers/fanNoise'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <FanNoiseProvider>
    <Component {...pageProps} />
  </FanNoiseProvider>
  )
}

export default MyApp
