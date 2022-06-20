import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HomeIcon } from '@heroicons/react/outline';
import Logos from '../components/Logo';
import ModeSwitcher from '../components/ModeSwitcher';
import Search from '../components/Search';
import { UserContext } from '../lib/react/context';

export default function Header() {
  const { user, username } = useContext(UserContext);

  // Theme will not be known on the server; only render ModeSwitcher after component mounted
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 border-b dark:border-cx-dark-3 dark:text-white shadow-lg h-[var(--header-height)]">
      <div className="flex max-w-6xl items-center justify-between dark:text-white">
        {/* Left */}
        <div onClick={() => router.push('/')}>
          <Logos />
        </div>

        {/* Center - Search Input */}
        <div className="max-w-xs">
          <Search />
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4 mr-6">
          <HomeIcon className="navBtn" onClick={() => router.push('/')} />
          {mounted && <ModeSwitcher />}

          <button onClick={() => router.push('/login')} className="navBtn">
            Login
          </button>

          <button onClick={() => router.push('/signup')} className="navBtn">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
