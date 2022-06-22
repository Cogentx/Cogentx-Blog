import { User } from 'firebase/auth';
import { createContext } from 'react';

interface IUserContext {
  user: User | null | undefined;
  username: null;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  username: null,
});
