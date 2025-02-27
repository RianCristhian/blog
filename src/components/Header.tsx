import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <nav className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-gray-200 transition-colors duration-200">
          Blog
        </Link>
        <Link href="/admin" className="text-lg hover:text-gray-200 transition-colors duration-200">
          Admin
        </Link>
      </nav>
    </header>
  );
}