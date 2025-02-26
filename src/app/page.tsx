import PostCard from '@/components/PostCard';

interface Post {
  _id: string;
  title: string;
  slug: string;
  createdAt: Date;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, { cache: 'no-store' });
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Meu Blog</h1>
      {posts.map((post) => (
        <PostCard key={post._id} title={post.title} slug={post.slug} />
      ))}
    </div>
  );
}