import Link from 'next/link';

interface PostCardProps {
  title: string;
  slug: string;
}

export default function PostCard({ title, slug }: PostCardProps) {
  return (
    <Link href={`/${slug}`} className="block p-4 mb-4 border rounded hover:bg-gray-100">
      <h2 className="text-xl font-semibold">{title}</h2>
    </Link>
  );
}