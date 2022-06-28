import { FormEventHandler, useContext, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import kebabCase from 'lodash.kebabcase';
import { db, auth } from '../lib/firebase/fb-init';
import { UserContext } from '../lib/react/context';
import { fbServerTimestamp } from '../lib/firebase/fb-firestore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

/** Admin component to create new post
 *
 * @returns JSX.Element
 */
export default function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);

  const [title, setTitle] = useState('');

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate slug length
  const isValid = title.length > 3 && title.length < 100;

  //TODO: factor out Firebase
  const createPost: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Note: ManagePosts component must be wrapped by Auth Check to ensure user is logged in | otherwise 'useCollection' hook cannot be used. The '!' syntax in 'auth.currentUser!.uid' is our guarantee to TypeScript that 'auth.currentUser' will be available at runtime.
    const uid = auth.currentUser!.uid;
    const postRef = doc(db, 'users', uid, 'posts', slug);

    // Advisable to provide all fields default values to avoid query errors later
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: '',
      createdAt: fbServerTimestamp(),
      updatedAt: fbServerTimestamp(),
      heartCount: 0,
    };

    try {
      await setDoc(postRef, data);

      toast.success('Post created!');

      // Imperative navigation after doc is set
      router.push(`/admin/${slug}`);
    } catch (error) {
      //TODO: handle error properly
      console.log('Error Creating New Post', error);
    }
  };

  return (
    <form onSubmit={createPost}>
      <input
        type="text"
        className="outline-none border-none text-4xl w-full py-1 px-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome New Article!"
      />
      <p>
        <strong>Slug:</strong>
        {slug}
      </p>
      <button type="submit" className="btn" disabled={!isValid}>
        Create New Post
      </button>
    </form>
  );
}
