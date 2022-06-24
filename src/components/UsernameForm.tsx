import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/react/context';
import Loading from './Loading';
import { db } from '../lib/firebase/fb-init';
import { doc, getDoc } from 'firebase/firestore';

export default function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username } = useContext(UserContext);

  useEffect(() => {
    formValue && checkUsername(formValue);
  }, [formValue]);

  const checkUsername = async (username: string) => {
    if (username.length >= 3) {
      const ref = doc(db, 'usernames', username);
      const snapshot = await getDoc(ref);
      console.log('Firestore read executed!', snapshot.exists());
      setIsValid(!snapshot.exists());
      setLoading(false);
    }
  };

  const onSubmit = () => {
    console.log('on submit');
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Force form value typed in form to match correct format
    const val = event?.target.value.toLowerCase();
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

  return (
    !formValue && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input type="text" name="username" placeholder="Username" value={formValue} onChange={onChange} />
          <button className="bg-green-500" type="submit" onSubmit={onSubmit} disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading}
            <br />
            Username Valid: {isValid}
          </div>
        </form>
      </section>
    )
  );
}
