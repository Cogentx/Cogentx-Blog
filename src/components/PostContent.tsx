import Link from 'next/link';
import { Timestamp } from 'firebase/firestore';
import { IPost } from '../@interfaces/IBlogPosts';
import ReactMarkdown from 'react-markdown';

type IProps = {
  post: IPost;
};

export default function PostContent({ post }: IProps) {
  const createdAt =
    post?.createdAt && typeof post.createdAt === 'number'
      ? new Date(post.createdAt)
      : (post.createdAt as Timestamp).toDate();

  return (
    <div className="p-8 my-4 mx-0 bg-white border border-cx-dark-3 rounded-lg">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by{' '}
        <Link href={`/${post.username}/`}>
          <a className="font-bold text-blue-500">@{post.username}</a>
        </Link>{' '}
        on {createdAt.toISOString()}
      </span>
      {post?.content && <ReactMarkdown>{post.content}</ReactMarkdown>}
    </div>
  );
}
