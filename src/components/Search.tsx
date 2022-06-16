import { SearchIcon } from '@heroicons/react/outline';

export default function Search() {
  return (
    <div className="relative rounded-md p-1 mt-0">
      <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon className="h-5 text-gray-500" />
      </div>
      <input
        className="block w-full pl-10 border-gray-300 bg-gray-50 rounded-md focus:border-black focus:ring-black sm:text-sm"
        type="text"
        placeholder="Search coming soon..."
      />
    </div>
  );
}
