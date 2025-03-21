import PostCard from '@/components/PostCard';

interface Post {
  _id: string;
  title: string;
  slug: string;
  createdAt: Date;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts`, { cache: 'no-store' });
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-blue-600 dark:bg-gray-800 text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Meu Blog</h1>
          <p className="mt-2 text-lg text-gray-200">Leia minhas histórias e pensamentos</p>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Nenhum post disponível no momento.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post._id} title={post.title} slug={post.slug} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}