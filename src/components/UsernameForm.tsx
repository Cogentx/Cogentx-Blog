import { ChangeEvent, FormEvent, FormEventHandler, useCallback, useContext, useEffect, useState } from 'react';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
import debounce from 'lodash.debounce';
import { UserContext } from '../lib/react/context';
import { db } from '../lib/firebase/fb-init';

// TODO:factor out Firebase functions to 'lib/firebase/...'
export default function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = doc(db, 'usernames', username);
        const snapshot = await getDoc(ref);

        setIsValid(!snapshot.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!user || !formValue) return;

    // create refs for both documents
    const userDoc = doc(db, 'users', user.uid);
    const usernameDoc = doc(db, 'usernames', formValue);

    // commit both docs together
    const batch = writeBatch(db);
    batch.set(userDoc, {
      username: formValue,
      photoUrl: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, {
      uid: user.uid,
    });

    try {
      await batch.commit();
    } catch (error) {
      console.log('set username failed', error);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Force form value typed in form to match correct format
    const val = e?.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    formValue && checkUsername(formValue);
  }, [formValue, checkUsername]);

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit} className="flex flex-col mt-4">
          <input
            type="text"
            name="username"
            className="bg-transparent"
            placeholder="Username"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage username={formValue} loading={loading} isValid={isValid} />
          <button className="btn mt-4" type="submit" onSubmit={onSubmit} disabled={!isValid}>
            Choose
          </button>

          <h3 className="mt-8 font-bold">Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}

interface IUserMessageProps {
  username: string;
  isValid: boolean;
  loading: boolean;
}

function UsernameMessage({ username, loading, isValid }: IUserMessageProps): JSX.Element {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="font-bold text-green-500">{username} is available!</p>;
  } else if (username && username.length >= 3 && !isValid) {
    return <p className="font-bold text-red-500">Sorry, username is taken!</p>;
  } else {
    return <p></p>;
  }
}
