import { Timestamp } from 'firebase/firestore';

// users/{uid}/posts/{slug} | user can have many posts
interface IPost {
  title: string;
  slug: string;
  uid: string;
  username: string;
  published: boolean;
  content: string;
  createdAt?: Timestamp | number;
  updatedAt?: Timestamp | number;
  heartCount?: number;
}

// users/{uid}/posts/{slug}/hearts/{uid} | many-to-many relationship between users and posts via hearts
interface IHeart {
  uid: string;
}

export type { IPost, IHeart };
