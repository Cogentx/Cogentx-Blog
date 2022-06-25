import Link from 'next/link';
import { IPost } from '../@interfaces/IBlogPosts';

type IProps = {
  post: IPost;
  admin?: boolean;
};

export default function Post({ post, admin = false }: IProps) {
  const wordCount = post.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="p-8 my-4 bg-white border-cx-dark-3 border rounded-lg">
      <Link href={`/${post.username}`}>
        <a className="text-inherit no-underline cursor-pointer">
          <strong>By @{post.username}</strong>
        </a>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a className="text-inherit no-underline cursor-pointer">{post.title}</a>
        </h2>
      </Link>

      <footer className="flex">
        <span>
          {wordCount} words. {minutesToRead} min read.
        </span>
        <span className="ml-auto">💗 {post.heartCount || 0} Hearts</span>
      </footer>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button>Edit</button>
            </h3>
          </Link>

          {post.published ? (
            <p className="text-cx-green font-bold">Live</p>
          ) : (
            <p className="text-red-500 font-bold">Unpublished</p>
          )}
        </>
      )}
    </div>
  );
}
