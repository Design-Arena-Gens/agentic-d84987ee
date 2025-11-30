import mongoose, { Schema, models, model, type InferSchemaType } from 'mongoose';

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  tags: [{ type: String }],
  coverUrl: { type: String },
  repoUrl: { type: String },
  demoUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export type Project = InferSchemaType<typeof ProjectSchema> & { _id: mongoose.Types.ObjectId };

export default (models.Project as mongoose.Model<Project>) || model<Project>('Project', ProjectSchema);
