import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

type IProps = {
  children: any;
};

export default function Layout({ children }: IProps) {
  return (
    <>
      <Head>
        <title>Cogent X Blog</title>
        <meta name="description" content="Cogent X Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen overflow-y-scroll scrollbar-hide">
        <main className="flex-grow container mx-auto sm-px-6 min-h-screen">{children}</main>


      </div>
    </>
  );
}
