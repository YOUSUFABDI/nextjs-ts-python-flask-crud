import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { MyProvider } from '../context/MyContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MyProvider>
      <Toaster />
      <Component {...pageProps} />
    </MyProvider>
  )
}
