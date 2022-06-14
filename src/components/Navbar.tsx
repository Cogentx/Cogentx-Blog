import Image from 'next/image';

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b dark:text-white shadow-sm">
      <div className="flex max-w-6xl items-center justify-between dark:text-white">
        {/* Left */}
        <div>
          {/* Full Logo - larger screens */}
          <div className="relative hidden h-12 w-36 cursor-pointer items-center lg:flex">
            <Image src="/cx-logo-name.png" alt="Cogentx Full Logo" layout="fill" objectFit="contain" priority />
          </div>
          {/* Small Logo - smaller screens */}
          <div className="relative h-12 w-12 cursor-pointer flex-shrink-0 items-center lg:hidden">
            <Image src="/cx-logo-512.png" alt="Cogentx Logo" layout="fill" objectFit="contain" priority />
          </div>
        </div>

        {/* Center - Search Input */}
        <div className="max-w-xs">
          <div className="relative mt-1 rounded-md p-3">

          </div>
        </div>

        {/* Right */}
        <h1 className="text-white">Sign In</h1>
      </div>
    </div>
  );
}
