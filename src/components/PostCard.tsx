import Link from 'next/link';

interface PostCardProps {
  title: string;
  slug: string;
}

export default function PostCard({ title, slug }: PostCardProps) {
  return (
    <Link
      href={`/${slug}`}
      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
        {title}
      </h2>
    </Link>
  );
}