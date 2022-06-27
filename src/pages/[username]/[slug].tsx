import { doc, query, collectionGroup, limit, getDocs, getDoc } from 'firebase/firestore';
import { getUserWithUsername, postToJSON } from '../../lib/firebase/fb-firestore';
import { db } from '../../lib/firebase/fb-init';

type IProps = {
  path: string;
};

export default function PostPage({ path }: IProps) {
  return <main>PostPage</main>;
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
      const postRef = doc(db, userDoc.ref.path, 'posts',slug);

      const post = postToJSON(await getDoc(postRef));
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
      fallback: 'blocking',
    };
  } catch (error) {
    // TODO: handle error properly
    console.log('[slug] static paths failed', error);
  }
}
