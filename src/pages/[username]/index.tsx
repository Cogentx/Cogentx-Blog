import Metatags from '../../lib/nextjs/Metatags';
import UserProfile from '../../components/UserProfile';
import Posts from '../../components/Posts';
import Post from '../../components/Post';

type IProps = {
  user: any;
  posts: any[];
};

export default function UserProfilePage({ user, posts }: IProps) {
  return (
    <main>
      <Metatags title={user.username} description={`${user.username}'s public profile`} />
      <UserProfile user={user} />
      <Posts posts={posts} />
    </main>
  );
}
