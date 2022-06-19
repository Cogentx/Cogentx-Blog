import type { NextPage } from 'next';
import Image from 'next/image';
import Layout from '../sections/Layout';
import Metatags from '../lib/nextjs/Metatags';
import UsernameForm from '../components/UsernameForm';
import { fbSignInWithGoogle, fbSignOut } from '../lib/firebase/fb-funcs';

/** SignInPage - 3 possible auth contexts
 * 1. user signed out - <SignInButton/>
 * 2. user signed in, but missing username - <UsernameForm/>
 * 3. user signed in, has username already - <SignOutButton/>
 *
 * @returns SignInPage | NextPage
 */
const LoginPage: NextPage = () => {
  const user = true;
  const username = true;

  return (
    <>
      <Metatags title="Cogentx Welcome!" description="Cogent X Blog Sign In Page" />

      <Layout>
        <div className="grid place-items-center h-full w-80 mx-auto">
          {user ? (
            !username ? (
              <UsernameForm />
            ) : (
              <button className="accessBtn" onClick={fbSignOut}>Sign Out</button>
            )
          ) : (
            <div>
              <button className="accessBtn" onClick={fbSignInWithGoogle}>
                <Image src="/google.png" alt="Google Logo" width={20} height={20} />
                <span>Sign in with Google</span>
              </button>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default LoginPage;
