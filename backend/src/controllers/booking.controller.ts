import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "@middleware/catchAsyncErrors";
import ErrorResponse from "@util/ErrorResponse";
import { Booking, IBooking } from "@model/booking.model";

import {
  GetBookingInput,
  CreateBookingInput,
  UpdateBookingInput,
  DeleteBookingInput,
} from "@schema/booking.schema";

export const getAllBookings = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookings: IBooking[] = await Booking.find();
    res.json(bookings);
  }
);

export const getBookingById = catchAsyncErrors(
  async (
    req: Request<GetBookingInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { bookingId } = req.params;
    const booking: IBooking | null = await Booking.findById(bookingId);
    if (!booking) {
      next(new ErrorResponse("Booking not found", 404));
    } else {
      res.json(booking);
    }
  }
);

export const createBooking = catchAsyncErrors(
  async (
    req: Request<CreateBookingInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    const booking: IBooking = new Booking(body);
    await booking.save();
    res.status(201).json(booking);
  }
);

export const updateBooking = catchAsyncErrors(
  async (
    req: Request<UpdateBookingInput["params"], UpdateBookingInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { bookingId } = req.params;
    const body = req.body;
    const booking: IBooking | null = await Booking.findById(bookingId);
    if (!booking) {
      next(new ErrorResponse("Booking not found", 404));
    } else {
      await Booking.updateOne({ _id: bookingId }, body);
      const updatedBooking: IBooking | null = await Booking.findById(bookingId);
      res.json(updatedBooking);
    }
  }
);

export const deleteBooking = catchAsyncErrors(
  async (
    req: Request<DeleteBookingInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { bookingId } = req.params;
    const booking: IBooking | null = await Booking.findById(bookingId);
    if (!booking) {
      next(new ErrorResponse("Booking not found", 404));
    } else {
      await booking.deleteOne();
      res.json({ message: "Booking deleted successfully" });
    }
  }
);
