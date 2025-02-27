'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  _id: string;
  title: string;
  slug: string;
}

export default function AdminPosts() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
      return;
    }

    fetch('/api/posts', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(() => router.push('/admin'));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, slug }),
    });
    if (res.ok) {
      const newPost = await res.json();
      setPosts([newPost, ...posts]);
      setTitle('');
      setContent('');
      setSlug('');
    }
  };

  const handleDelete = async (postId: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/posts?id=${postId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setPosts(posts.filter((post) => post._id !== postId));
    } else {
      alert('Erro ao excluir o post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Gerenciar Posts</h1>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-12">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Slug (ex.: meu-post)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            placeholder="Conteúdo"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-40"
          />
          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Publicar
          </button>
        </form>

        {/* Lista de Posts */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Posts Existentes</h2>
        {posts.length === 0 ? (
          <p className="text-gray-600 text-center">Nenhum post encontrado.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post._id}
                className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <span className="text-gray-800 font-medium">{post.title} <span className="text-gray-500">({post.slug})</span></span>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}