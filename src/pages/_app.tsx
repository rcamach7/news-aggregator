import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';

import theme from '../theme';
import { UserContextProvider } from '../context/UserContext';
import { LoadingProvider } from '@/context/LoadingContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <LoadingProvider>
          <ThemeProvider theme={theme}>
            <Head>
              <link rel="icon" type="image/x-icon" href="logos/fav.svg" />
            </Head>
            <Component {...pageProps} />
            <CssBaseline />
          </ThemeProvider>
        </LoadingProvider>
      </UserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
