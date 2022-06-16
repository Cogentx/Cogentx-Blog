import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HomeIcon } from '@heroicons/react/outline';
import Logos from '../components/Logo';
import ModeSwitcher from '../components/ModeSwitcher';
import Search from '../components/Search';

export default function Header() {
  // Theme will not be known on the server; only render ModeSwitcher after component mounted
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 border-b dark:border-cx-dark-3 dark:text-white shadow-lg">
      <div className="flex max-w-6xl items-center justify-between dark:text-white">
        {/* Left */}
        <div onClick={() => router.push('/')}>
          <Logos />
        </div>

        {/* Center - Search Input */}
        <div className="max-w-xs">
          <Search/>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4 mr-6">
          <HomeIcon className="navBtn" />
          {mounted && <ModeSwitcher />}
          <h1 className="navBtn">Sign In</h1>
        </div>
      </div>
    </div>
  );
}
