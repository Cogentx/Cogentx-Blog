import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import { UserContext } from '../lib/react/context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContext.Provider value={{user:{}, username:'Cogentx'}}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
