import {
  collection,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from 'firebase/firestore';
import { IPost } from '../../@interfaces/IBlogPosts';
import { db } from './fb-init';

/** Get a user/{uid} document with username
 *
 * @param {string} username
 */
const getUserWithUsername = async (username: string) => {
  const q = query(collection(db, 'users'), where('username', '==', username), limit(1));

  const userDoc = (await getDocs(q)).docs[0];

  return userDoc;
};

/** Converts a Firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
const postToJSON = (doc: DocumentSnapshot) => {
  const data: IPost = doc.data() as IPost;
  const createdAt = (<Timestamp>data?.createdAt).toMillis() || 0;
  const updatedAt = (<Timestamp>data?.updatedAt).toMillis() || 0;

  return {
    ...data,
    // Gotcha! Firestore Timestamp NOT serializable to JSON. Must convert to milliseconds; toMillis() is a method on Firestore Timestamps
    createdAt,
    updatedAt,
  };
};

/** Converts a 'number' to a Firestore Timestamp object
 * @param {number} timestamp in number format
 */
const fbFromMillis = (timestamp: number) => {
  Timestamp.fromMillis(timestamp);
};

/** Instructs Firestore to create Timestamp on the server side
 *
 * Note: this avoids issues with creating timestamp on the client side which introduces issues with date settings, timezone settings, etc.
 */
const fbServerTimestamp = () => serverTimestamp;

export { getUserWithUsername, postToJSON, fbFromMillis, fbServerTimestamp };
