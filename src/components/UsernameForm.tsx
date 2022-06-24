import { useState } from 'react';
import { useUserData } from '../lib/firebase/fb-hooks';
import Loading from './Loading';

export default function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username } = useUserData();

  const onSubmit = () => {
    console.log('on submit');
  };

  const onChange = () => {
    console.log('on change');
  };

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input type="text" name="username" placeholder="Username" value={formValue} onChange={onChange} />
          <button className="bg-green-500" type="submit" onSubmit={onSubmit} disabled={!isValid}>Choose</button>

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
