import { createContext } from 'react';


export const UserContext = createContext<{ user: {} | null; username: string | null }>({
  user: null,
  username: null,
});
