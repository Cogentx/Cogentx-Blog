import type { NextPage } from 'next';
import Head from 'next/head';
import { collectionGroup, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Layout from '../sections/Layout';
import { db } from '../lib/firebase/fb-init';
import { postToJSON } from '../lib/firebase/fb-helpers';

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

const LIMIT = 1;

/** Enable SSR
 * @params context
 */
export async function getServerSideProps() {
  // TODO: factor out Firebase stuff to 'lib/firebase/...'
  const ref = collectionGroup(db, 'posts');
  const postsQuery = query(ref, where('published', '==', true), orderBy('createdAt', 'desc'), limit(LIMIT));

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return { props: { posts } };
}
