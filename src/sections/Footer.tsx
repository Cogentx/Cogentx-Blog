export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 py-6 mt-24">
      <div className="text-center text-sm-text-gray-500">
        <span className="text-gray-900 dark:text-gray-100 font-bold text-lg mr-2">Cogent X360 Labs</span> &copy;{' '}
        {new Date().getFullYear()} All Rights Reserved
      </div>
    </footer>
  );
}
