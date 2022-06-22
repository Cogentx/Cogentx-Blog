import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/react/context';
import { useUserData } from '../lib/firebase/fb-hooks';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
