import { Document, Schema, model } from 'mongoose';

export interface IReview extends Document {
  user: Schema.Types.ObjectId;
  movie: Schema.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updateAt: Date;
}

const reviewSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
}, { timestamps: true })

export const Review = model<IReview>('Review', reviewSchema);