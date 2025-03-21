interface Post {
  title: string;
  content: string;
  slug: string;
}

async function getPost(slug: string): Promise<Post> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const url = `${baseUrl}/api/posts?slug=${slug}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erro ao buscar post: ${errorText}`);
  }
  return res.json();
}

export default async function PostPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = await paramsPromise;
  try {
    const post = await getPost(params.slug);
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <main className="max-w-4xl mx-auto px-4 py-12">
          <article className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">{post.title || 'Título não disponível'}</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{post.content || 'Conteúdo não disponível'}</p>
          </article>
        </main>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Post não encontrado</h1>
          <p className="text-gray-600 dark:text-gray-400">Verifique se o slug está correto ou tente novamente mais tarde.</p>
        </div>
      </div>
    );
  }
}