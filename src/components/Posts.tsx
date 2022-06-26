import { useState } from 'react';
import { IPost } from '../@interfaces/IBlogPosts';
import Post from './Post';

type IProps = {
  posts: IPost[];
  admin?: boolean;
};

export default function Posts({ posts, admin }: IProps) {

  return <>{posts && posts.map((post) => <Post post={post} key={post.slug} />)}</>;
}
