import { model, Schema, Document } from 'mongoose';
import { Movie } from '@model/movie.model';

export interface IGenre extends Document {
  name: string;
  description: string;
  movies: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const genreSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  movies: [{ type: Schema.Types.ObjectId, ref: Movie }]
}, { timestamps: true });

export const Genre = model<IGenre>('Genre', genreSchema);
