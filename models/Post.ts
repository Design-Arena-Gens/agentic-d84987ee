import mongoose, { Schema, models, model, type InferSchemaType } from 'mongoose';

const PostSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  coverUrl: { type: String },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export type Post = InferSchemaType<typeof PostSchema> & { _id: mongoose.Types.ObjectId };

export default (models.Post as mongoose.Model<Post>) || model<Post>('Post', PostSchema);
