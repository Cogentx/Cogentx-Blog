import { doc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { IPost } from '../@interfaces/IBlogPosts';
import { auth, db } from '../lib/firebase/fb-init';
import PostDeleteButton from './PostDeleteButton';
import PostForm from './PostForm';

export default function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  // get 'slug' from router's URL query params available as an object
  const { slug } = router.query;

  // Note: ManagePosts component must be wrapped by Auth Check to ensure user is logged in | otherwise 'useCollection' hook cannot be used. The '!' syntax in 'auth.currentUser!.uid' is our guarantee to TypeScript that 'auth.currentUser' will be available at runtime.
  const uid = auth.currentUser!.uid;
  const postRef = doc(db, 'users', uid, 'posts', slug as string);
  // get the post without 'realtime' connection
  const [post] = useDocumentDataOnce(postRef);

  return (
    <>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm postRef={postRef} defaultValues={post as IPost} preview={preview} />
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="btn">Live View</button>
            </Link>
            <PostDeleteButton postRef={postRef} />
          </aside>
        </>
      )}
    </>
  );
}
