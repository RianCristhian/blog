import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-4 bg-gray-800 text-white">
      <nav className="max-w-3xl mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">Blog</Link>
        <Link href="/admin" className="text-sm">Admin</Link>
      </nav>
    </header>
  );
}