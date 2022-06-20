import { signInWithPopup, signInAnonymously, Auth, AuthProvider } from 'firebase/auth';
import { auth, authProviderGoogle } from './fb-init';

/** Asynchronously signs in as an anonymous user
 *
@remarks
If there is already an anonymous user signed in, that user will be returned; otherwise, a new anonymous user identity will be created and returned.

@param auth — The Auth instance.

@public
 */
const fbSignInAnonymously = async () => {
  try {
    await signInAnonymously(auth);
  } catch (error) {
    // TODO: add proper error handling
    console.log('fb-funcs-anon: ', error);
  }
};

/** Authenticates a Firebase client using a popup-based OAuth authentication flow
 *

@remarks
If succeeds, returns the signed in user along with the provider's credential. If sign in was unsuccessful, returns an error object containing additional information about the error.

@example

// Sign in using a popup.
const provider = new GoogleAuthProvider();
const result = await signInWithPopup(auth, provider);

// The signed-in user info.
const user = result.user;
// This gives you a Google Access Token.
const credential = provider.credentialFromResult(auth, result);
const token = credential.accessToken;
@param auth — The Auth instance.

@param provider
The provider to authenticate. The provider has to be an OAuthProvider. Non-OAuth providers like EmailAuthProvider will throw an error.

@param resolver
An instance of PopupRedirectResolver, optional if already supplied to initializeAuth or provided by getAuth.

@public
 */

const fbSignInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, authProviderGoogle);
  } catch (error) {
    // TODO: add proper error handling
    console.log('fb-funcs-popup: ', error);
  }
};

// const fbSignInWithGoogle = () => {
//   fbSignInWithPopup(authProviderGoogle);
// };

const fbSignOut = async () => {
  try {
    console.log('goodbye');

    await auth.signOut();
  } catch (error) {
    // TODO: add proper error handling
    console.log('fb-funcs-signout: ', error);
  }
};

export { fbSignInAnonymously, fbSignInWithGoogle, fbSignOut };
