import type { NextPage } from 'next';
import Head from 'next/head';
import { collectionGroup, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Layout from '../sections/Layout';
import { db } from '../lib/firebase/fb-init';
import { postToJSON } from '../lib/firebase/fb-helpers';
import { IPost } from '../@interfaces/IBlogPosts';
import Posts from '../components/Posts';
import { useState } from 'react';
import Loading from '../components/Loading';

// apply 'dark' class to trigger dark mode
interface IProps {
  posts: IPost[];
}
const Home: NextPage<IProps> = ({ posts: postsFromSSR }: IProps) => {
  const [posts, setPosts] = useState(postsFromSSR);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  return (
    <>
      <Head>
        <title>Cogent X Blog</title>
        <meta name="description" content="Cogent X Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Posts posts={posts} />

        {!loading && !postsEnd && <button>Learn More</button>}

        <Loading show={!loading} />

        {postsEnd && 'You have reached the end!'}
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

  let posts = null;

  try {
    console.log('before', { posts });

    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
    console.log('after', { posts });
  } catch (error) {
    // TODO: handle error properly
    console.log('SSR-home: ', error);
  }

  return { props: { posts } };
}
