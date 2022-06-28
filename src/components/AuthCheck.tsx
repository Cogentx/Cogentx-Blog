import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/react/context';

interface IProps {
  children: JSX.Element[];
  fallback?: JSX.Element;
}

/** Component to display content based on user's logged in state.
 *
 * @returns JSX.Element
 */
export default function AuthCheck({ children, fallback }: IProps) {
  const { username } = useContext(UserContext);

  return username ? children : fallback || <Link href="/enter">Secure content. Please login in to continue.</Link>;
}