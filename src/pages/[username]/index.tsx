import { query, collection, where, limit, orderBy, getDocs } from 'firebase/firestore';
import Metatags from '../../lib/nextjs/Metatags';
import UserProfile from '../../components/UserProfile';
import Posts from '../../components/Posts';
import { getUserWithUsername, postToJSON } from '../../lib/firebase/fb-helpers';
import { db } from '../../lib/firebase/fb-init';
import Layout from '../../sections/Layout';

type IProps = {
  user: any;
  posts: any[];
};

export default function UserProfilePage({ user, posts }: IProps) {
  return (
    <>
      <Metatags title={user.username} description={`${user.username}'s public profile`} />

      <Layout>
        <UserProfile user={user} />
        <Posts posts={posts} />
      </Layout>
    </>
  );
}

type ServerProps = {
  query: { username: string };
};
export async function getServerSideProps({ query: urlQuery }: ServerProps) {
  const { username } = urlQuery;

  if (!username) return { notFound: true };

  let userDoc = null;

  try {
    userDoc = await getUserWithUsername(username);
  } catch (error) {
    // TODO: add proper error handling
    console.log('get username on server side failed-1: ', error);
  }

  // if no user, go to 404 page
  if (!userDoc) return { notFound: true };

  let user = userDoc.data();

  let posts = null;

  // posts is under user document in Firestore: users/{uid}/posts
  const postQuery = query(
    collection(db, userDoc.ref.path, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(5)
  );

  // JSON serialize data to send over Internet
  try {
    posts = (await getDocs(postQuery)).docs.map(postToJSON);
  } catch (error) {
    // TODO: add proper error handling
    console.log('get username on server side failed-2: ', error);
  }
  // will be passed to the page component as props
  return { props: { user, posts } };
}
