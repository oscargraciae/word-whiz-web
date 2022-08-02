import 'tailwindcss/tailwind.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { withTRPC } from '@trpc/next'

import { AppRouter } from '../server/routers/_app'
import { AuthProvider } from '../context/AuthContext'

import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {/* <AuthProvider> */}
        <Component {...pageProps} />
      {/* </AuthProvider> */}
    </SessionProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:8000/api/trpc';

    return {
      url,
    };
  },
  ssr: true,
})(MyApp);

// export default MyApp
