import mongoose, { Schema, models, model, type InferSchemaType } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  name: { type: String },
  role: { type: String, enum: ['admin', 'user'], default: 'admin' },
  otpHash: { type: String },
  otpExpiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export type User = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };

export default (models.User as mongoose.Model<User>) || model<User>('User', UserSchema);
