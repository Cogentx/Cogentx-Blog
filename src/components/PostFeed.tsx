import { IPost } from "../@interfaces/IBlogPosts";

type IProps = {
  posts: IPost[];
};

export default function PostFeed({ posts }: IProps) {

  return (
    <div>
      PostFeed
    </div>
  );
};
