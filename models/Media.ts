import mongoose, { Schema, models, model, type InferSchemaType } from 'mongoose';

const MediaSchema = new Schema({
  publicId: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  format: { type: String },
  width: { type: Number },
  height: { type: Number },
  bytes: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export type Media = InferSchemaType<typeof MediaSchema> & { _id: mongoose.Types.ObjectId };

export default (models.Media as mongoose.Model<Media>) || model<Media>('Media', MediaSchema);
