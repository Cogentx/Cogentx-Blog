import type { NextPage } from 'next';
import toast from 'react-hot-toast';
import Layout from '../sections/Layout';

// apply 'dark' class to trigger dark mode
const Home: NextPage = () => {
  return (
    <Layout>
      <button onClick={() => toast.success('Hello World!!!')}>Hello World</button>
    </Layout>
  );
};

export default Home;
