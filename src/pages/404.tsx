import Link from 'next/link';
import Metatags from '../lib/nextjs/Metatags';
import Layout from '../sections/Layout';

/** Custom 404 page
 *
 * Note: File name must be 404 to be automatically displayed by Next when page is not found.
 *
 * Note: Any page that is server rendered can redirect to a 404 if the data is not available.
 * 
 * @returns
 */
export default function Custom404Page() {
  return (
    <>
      <Metatags title="404 | Not Found" description="Custom 404 Not Found Page" />

      <Layout>
        <div className="grid place-items-center h-full">
          <h1>404 - Sorry, that page cannot be found!</h1>
          <iframe
            src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
            frameBorder="0"
            width="480"
            height="362"
            allowFullScreen
          ></iframe>
          <Link href="/">
            <button className="btn">Go Home</button>
          </Link>
        </div>
      </Layout>
    </>
  );
}
