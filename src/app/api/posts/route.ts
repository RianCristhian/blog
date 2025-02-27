import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Post from '@/models/Post';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  console.log('Slug recebido na API:', slug);

  if (slug) {
    const post = await Post.findOne({ slug });
    console.log('Post encontrado na API:', post);
    if (!post) return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    return NextResponse.json(post);
  }

  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const { title, content, slug } = await req.json();
  await connectToDatabase();
  const post = new Post({ title, content, slug });
  await post.save();
  return NextResponse.json(post, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  console.log('ID recebido para exclusão:', id);

  if (!id) {
    return NextResponse.json({ error: 'ID do post é necessário' }, { status: 400 });
  }

  await connectToDatabase();
  const result = await Post.findByIdAndDelete(id);

  console.log('Resultado da exclusão:', result);

  if (!result) {
    return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Post excluído com sucesso' }, { status: 200 });
}