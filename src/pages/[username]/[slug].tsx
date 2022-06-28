import type { NextPage } from 'next';
import { useContext } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc, query, collectionGroup, limit, getDocs, getDoc } from 'firebase/firestore';
import type { IPost } from '../../@interfaces/IBlogPosts';
import Layout from '../../sections/Layout';
import PostContent from '../../components/PostContent';
import { getUserWithUsername, postToJSON } from '../../lib/firebase/fb-firestore';
import { db } from '../../lib/firebase/fb-init';
import Metatags from '../../lib/nextjs/Metatags';
import { UserContext } from '../../lib/react/context';

type IProps = {
  path: string;
  post: IPost;
};

/** PostPage
 *
 * Note: with Realtime client-side hydration enabled, reacts to realtime updates but requires extra read to Firestore DB
 *
 * @param path{string} path
 * @param post{string} IPost
 * @returns PostPage as JSX.Element
 */
export default function PostPage({ path, post: postFromProps }:IProps) {
  // user 'path' returned from 'getStaticProps' to access on client side
  const postRef = doc(db, path);
  const [realtimePost] = useDocumentData(postRef);

  const post = (realtimePost as IPost) || postFromProps;
  const { user: currentUser } = useContext(UserContext);

  return (
    <>
      <Metatags title={post.title} description={post.title} />

      <Layout>
        <section>
          <PostContent post={post} />
        </section>
      </Layout>
    </>
  );
}

interface IStaticProps {
  params: {
    username: string;
    slug: string;
  };
}

//TODO: factor out Firebase stuff to 'lib/firebase/...'
export async function getStaticProps({ params }: IStaticProps) {
  const { username, slug } = params;

  try {
    const userDoc = await getUserWithUsername(username);
    if (userDoc) {
      const postRef = doc(db, userDoc.ref.path, 'posts', slug);

      const post = postToJSON(await getDoc(postRef));

      // having 'path' will make it easier to rehydrate on the client side to enable realtime data on client side
      const path = postRef.path;

      return {
        props: {
          post,
          path,
          // TODO: adjust for production (to 5000ms)
          revalidate: 100,
        },
      };
    }
  } catch (error) {
    // TODO: handle error properly
    console.log('[slug] static props failed', error);
  }
}

//TODO: factor out Firebase stuff to 'lib/firebase/...'
export async function getStaticPaths() {
  // TODO: refactor using Firestore Admin SDK to select empty docs
  const q = query(collectionGroup(db, 'posts'), limit(20));

  try {
    const snapshot = await getDocs(q);

    const paths = snapshot.docs.map((doc) => {
      const { slug, username } = doc.data();
      return {
        params: { slug, username },
      };
    });

    /** Must be in the format:
     * paths: [
     * {params:{ slug, username}}
     * ]
     */
    return {
      paths,
      // fallback of 'blocking' tells Next to fallback to SSR; which then enables page to be cached on CDN as if it had been statically built
      fallback: 'blocking',
    };
  } catch (error) {
    // TODO: handle error properly
    console.log('[slug] static paths failed', error);
  }
}
