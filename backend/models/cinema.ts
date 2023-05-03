import { Document, Schema, model } from 'mongoose';

export interface ICinema extends Document {
  name: string;
  location: string;
  address: string;
  phone: string;
  showtimes: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const cinemaSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  showtimes: [{ type: Schema.Types.ObjectId, ref: "Showtime" }]
}, { timestamps: true });

export const Cinema = model<ICinema>("Cinema", cinemaSchema);
