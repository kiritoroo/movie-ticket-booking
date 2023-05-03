import { Document, Schema, model } from 'mongoose';

export interface IShowtime extends Document {
  movie: Schema.Types.ObjectId;
  cinema: Schema.Types.ObjectId;
  startAt: Date;
  endAt: Date;
  seats: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const showtimeSchema = new Schema({
  movie: { type: Schema.Types.ObjectId, ref: "Movie" },
  cinema: { type: Schema.Types.ObjectId, ref: "Cinema" },
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },
  seats: [{ type: Schema.Types.ObjectId, ref: "Seat" }]
}, { timestamps: true });

export const Showtime = model<IShowtime>("Showtime", showtimeSchema);
