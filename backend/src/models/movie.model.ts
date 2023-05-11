import { Document, Schema, model } from 'mongoose';
import { Genre } from '@model/genre.model';

export interface IMovie extends Document {
  title: string;
  overview: string;
  runtime: number;
  director: string;
  actors: string[];
  mpaaRating: string;
  imdbScore: number;
  rating: number;
  country: string;
  language: string[];
  releaseDate: Date;
  posterPath: string;
  thumbPath: string;
  trailerPath: string;
  genres: Schema.Types.ObjectId[]
  createdAt: Date;
  updateAt: Date;
}

const movieSchema: Schema = new Schema({
  title: { type: String, required: true },
  overview: { type: String, required: true },
  runtime: { type: Number, required: true },
  director: { type: String, required: true },
  actors: [{ type: String, required: true }],
  mpaaRating: { type: String, required: true },
  imdbScore: { type: Number, required: true },
  rating: { type: Number, required: true },
  country: { type: String, required: true },
  language: [{ type: String, required: true }],
  releaseDate: { type: Date, required: true },
  posterPath: { type: String, required: true },
  thumbPath: { type: String, required: true },
  trailerPath: { type: String, required: true },
  genres: [{ type: Schema.Types.ObjectId, ref: Genre }]
}, { timestamps: true });

export const Movie = model<IMovie>('Movie', movieSchema);
