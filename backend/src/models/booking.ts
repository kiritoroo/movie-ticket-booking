import { Document, Schema, model } from 'mongoose';

export interface IBooking extends Document {
  user: Schema.Types.ObjectId;
  showtime: Schema.Types.ObjectId;
  seats: Schema.Types.ObjectId[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
  seats: [{ type: Schema.Types.ObjectId, ref: 'Seat' }],
  totalPrice: { type: Number, required: true }
}, { timestamps: true })

export const Booking = model<IBooking>("Cinema", bookingSchema);
