interface Post {
    title: string;
    content: string;
  }
  
  async function getPost(slug: string): Promise<Post> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?slug=${slug}`, { cache: 'no-store' });
    return res.json();
  }
  
  export default async function PostPage({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug);
  
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700">{post.content}</p>
      </div>
    );
  }