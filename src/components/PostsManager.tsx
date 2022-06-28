import { db, auth } from '../lib/firebase/fb-init';

//TODO: factor out Firebase

import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Posts from './Posts';
import { IPost } from '../@interfaces/IBlogPosts';

/** Admin component to manage user's current posts
 *
 * @returns JSX.Element
 */
export default function PostsManager() {
  // Note: ManagePosts component must be wrapped by Auth Check to ensure user is logged in | otherwise 'useCollection' hook cannot be used. The '!' syntax in 'auth.currentUser!.uid' is our guarantee to TypeScript that 'auth.currentUser' will be available at runtime.
  const uid = auth.currentUser!.uid;
  const postsRef = collection(db, 'users', uid, 'posts');
  const postsQuery = query(postsRef, orderBy('createdAt', 'desc'));

  const [querySnapshot] = useCollection(postsQuery);

  // Note: 'react-firebase-hooks' does have a 'useCollectionData' hook which can be used if the only work inside the map function is to return 'doc.data()'
  const posts = querySnapshot?.docs.map((doc) => doc.data()) as IPost[];

  return (
    <>
      <h1>Manage your Posts</h1>
      <Posts posts={posts} admin />
    </>
  );
}
