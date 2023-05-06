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
  showtime: { type: Schema.Types.ObjectId, ref: 'Showtime'},
  seats: [{ type: Schema.Types.ObjectId, ref: 'Seat', required: true }],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true })

export const Booking = model<IBooking>("Booking", bookingSchema);
