import Metatags from '../../lib/nextjs/Metatags';
import Layout from '../../sections/Layout';

interface IProps {
  prop: any;
}

export default function AdminPostsPage({ prop }: IProps) {
  return (
    <>
      <Metatags title="Posts | Admin" description="Posts page with admin privileges" />

      <Layout>
        <div className="grid place-items-center">AdminPostsPage</div>
      </Layout>
    </>
  );
}
