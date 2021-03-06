import Layout from '../../sections/Layout';
import AuthCheck from '../../components/AuthCheck';
import CreateNewPost from '../../components/CreateNewPost';
import PostsManager from '../../components/PostsManager';
import Metatags from '../../lib/nextjs/Metatags';

interface IProps {
  prop: any;
}

export default function AdminPostsPage({ prop }: IProps) {
  return (
    <>
      <Metatags title="Posts | Admin" description="Posts page with admin privileges" />

      <Layout>
        <AuthCheck>
          <PostsManager />
          <CreateNewPost />
        </AuthCheck>
      </Layout>
    </>
  );
}
