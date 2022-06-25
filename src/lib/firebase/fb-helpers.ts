import { collection, DocumentSnapshot, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
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
  const data = doc.data();
  return {
    ...data,
    // Gotcha! Firestore Timestamp NOT serializable to JSON. Must convert to milliseconds; toMillis() is a method on Firestore Timestamps
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
};

export { getUserWithUsername, postToJSON };
