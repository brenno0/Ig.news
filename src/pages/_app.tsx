import {AppProps} from 'next/App'
import React from 'react';
import { Header } from '../components/Header/Index';
import '../styles/global.scss';

function MyApp({ Component, pageProps }:AppProps) {
  return(
    <>
      <Header />
      <Component {...pageProps} />
    </>

  )
 
}

export default MyApp
