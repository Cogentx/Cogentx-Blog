import type { NextPage } from 'next';
import Head from 'next/head';
import toast from 'react-hot-toast';
import Layout from '../sections/Layout';
import Loading from '../components/Loading';

// apply 'dark' class to trigger dark mode
const SignInPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign In...</title>
        <meta name="description" content="Cogent X Blog Sign In Page" />
      </Head>

      <Layout>
        <Loading show={true} />
      </Layout>
    </>
  );
};

export default SignInPage;
