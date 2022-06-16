import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import Header from '../sections/Header';
import Footer from '../sections/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Header />
      <Component {...pageProps} />
      <Footer />
      <Toaster />
    </ThemeProvider>
  );
}

export default MyApp;
