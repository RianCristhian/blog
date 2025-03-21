import Link from 'next/link';

interface HeaderProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

export default function Header({ toggleDarkMode, darkMode }: HeaderProps) {
  return (
    <header className="bg-blue-600 dark:bg-gray-800 text-white py-4 shadow-md">
      <nav className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-gray-200 transition-colors duration-200">
          Blog
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/admin" className="text-lg hover:text-gray-200 transition-colors duration-200">
            Admin
          </Link>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-blue-600 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
    </header>
  );
}