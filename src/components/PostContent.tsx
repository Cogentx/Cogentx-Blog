import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { IPost } from '../@interfaces/IBlogPosts';

interface IProps {
  post: IPost;
}
// UI component for main post content
export default function PostContent({ post }: IProps) {
  let createdAt = null;
  if (post.createdAt !== undefined) {
    if (typeof post.createdAt === 'number') {
      createdAt = new Date(post.createdAt);
    } else {
      createdAt = post.createdAt.toDate();
    }
  }

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      {createdAt && (
        <span className="text-sm">
          Written by{' '}
          <Link href={`/${post.username}/`}>
            <a className="text-info">@{post.username}</a>
          </Link>{' '}
          on {createdAt.toISOString()}
        </span>
      )}
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}
