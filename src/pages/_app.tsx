import '../../faust.config';
import '../styles/globals.css';

import React from 'react';

import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
      <Component {...pageProps} key={router.asPath} />
    </FaustProvider>
  );
}
