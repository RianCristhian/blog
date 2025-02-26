import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Post from '@/models/Post';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  await connectToDatabase();
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