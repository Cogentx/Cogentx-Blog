import type { NextPage } from 'next';
import type { IPost } from '../@interfaces/IBlogPosts';
import { useState } from 'react';
import Head from 'next/head';
import { collectionGroup, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import Layout from '../sections/Layout';
import { db } from '../lib/firebase/fb-init';
import { postToJSON, fbFromMillis } from '../lib/firebase/fb-firestore';
import Posts from '../components/Posts';
import Loading from '../components/Loading';

const LIMIT = 1;

// apply 'dark' class to trigger dark mode
interface IProps {
  posts: IPost[];
}
const Home: NextPage<IProps> = ({ posts: postsFromSSR }: IProps) => {
  const [posts, setPosts] = useState(postsFromSSR);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);

    const lastPost = posts[posts.length - 1];

    const cursor = typeof lastPost.createdAt === 'number' ? fbFromMillis(lastPost.createdAt) : lastPost.createdAt;

    const ref = collectionGroup(db, 'posts');
    const postsQuery = query(
      ref,
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT)
    );

    let newPosts: IPost[] = [];
    try {
      // TODO: factor out Firebase stuff to 'lib/firebase/...'
      const postDocs = (await getDocs(postsQuery)).docs;

      newPosts = postDocs.map((doc) => doc.data()) as IPost[];
      setPosts(posts.concat(newPosts));
    } catch (error) {
      // TODO: handle error properly
      console.log('Error loading more posts', error);
    }
  };

  return (
    <>
      <Head>
        <title>Cogent X Blog</title>
        <meta name="description" content="Cogent X Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Posts posts={posts} />

        {!loading && !postsEnd && (
          <button className="btn mt-4" onClick={getMorePosts}>
            Learn More
          </button>
        )}

        <Loading show={!loading} />

        {postsEnd && 'You have reached the end!'}
      </Layout>
    </>
  );
};

export default Home;

/** Enable SSR
 * @params context
 */
export async function getServerSideProps() {
  // TODO: factor out Firebase stuff to 'lib/firebase/...'
  const ref = collectionGroup(db, 'posts');
  const postsQuery = query(ref, where('published', '==', true), orderBy('createdAt', 'desc'), limit(LIMIT));

  let posts: IPost[] = [];

  try {
    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  } catch (error) {
    // TODO: handle error properly
    console.log('SSR-home: ', error);
  }

  return { props: { posts } };
}
