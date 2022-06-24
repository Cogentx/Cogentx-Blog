import Image from 'next/image';
import { cxLogo, cxLogoName } from '../@domains/cx-logos';

export default function Logos() {
  return (
    <div>
      {/* Full Logo - larger screens */}
      <div className="relative hidden h-12 w-36 cursor-pointer items-center lg:flex">
        <Image src={cxLogoName} alt="Full Logo" layout="fill" objectFit="contain" priority />
      </div>
      {/* Small Logo - smaller screens */}
      <div className="relative h-12 w-12 cursor-pointer flex-shrink-0 items-center lg:hidden">
        <Image src={cxLogo} alt="Logo" layout="fill" objectFit="contain" priority />
      </div>
    </div>
  );
}
