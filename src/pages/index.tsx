import type { NextPage } from 'next';
import Head from 'next/head';
import toast from 'react-hot-toast';
import Layout from '../sections/Layout';

// apply 'dark' class to trigger dark mode
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cogent X Blog</title>
        <meta name="description" content="Cogent X Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <button onClick={() => toast.success('Hello World!!!')}>Hello World!!!</button>
      </Layout>
    </>
  );
};

export default Home;
