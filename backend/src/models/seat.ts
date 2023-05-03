import { Document, Schema, model } from 'mongoose';

export interface ISeat extends Document {
  showtime: Schema.Types.ObjectId;
  row: number;
  column: number;
  status: "available" | "booked" | "blocked";
  createdAt: Date;
  updatedAt: Date;
}


const seatSchema = new Schema({
  showtime: { type: Schema.Types.ObjectId, ref: "Showtime" },
  row: { type: Number, required: true },
  column: { type: Number, required: true },
  status: { type: String, enum: ["available", "booked", "blocked"], default: "available" }
}, { timestamps: true });

export const Seat = model<ISeat>("Seat", seatSchema);
