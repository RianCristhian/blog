import mongoose, { Schema, model, models } from 'mongoose';

interface IPost {
  title: string;
  content: string;
  slug: string;
  createdAt: Date;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = models.Post || model<IPost>('Post', postSchema);
export default Post;