import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '/static/images/default_avatar.png' },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true })

export const User = model<IUser>('User', userSchema);
