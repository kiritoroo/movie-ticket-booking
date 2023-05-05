import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "@middleware/catchAsyncErrors";
import ErrorResponse from "@util/ErrorResponse";
import { Seat, ISeat } from "@model/seat.model";

import {
  GetSeatInput,
  CreateSeatInput,
  UpdateSeatInput,
  DeleteSeatInput,
} from "@schema/seat.schema";

export const getAllSeats = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const seats: ISeat[] = await Seat.find();
    res.json(seats);
  }
);

export const getSeatById = catchAsyncErrors(
  async (
    req: Request<GetSeatInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { seatId } = req.params;
    const seat: ISeat | null = await Seat.findById(seatId);
    if (!seat) {
      next(new ErrorResponse("Seat not found", 404));
    } else {
      res.json(seat);
    }
  }
);

export const createSeat = catchAsyncErrors(
  async (
    req: Request<CreateSeatInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    const seat: ISeat = new Seat(body);
    await seat.save();
    res.status(201).json(seat);
  }
);

export const updateSeat = catchAsyncErrors(
  async (
    req: Request<UpdateSeatInput["params"], UpdateSeatInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { seatId } = req.params;
    const body = req.body;
    const seat: ISeat | null = await Seat.findById(seatId);
    if (!seat) {
      next(new ErrorResponse("Seat not found", 404));
    } else {
      await Seat.updateOne({ _id: seatId }, body);
      const updatedSeat: ISeat | null = await Seat.findById(seatId);
      res.json(updatedSeat);
    }
  }
);

export const deleteSeat = catchAsyncErrors(
  async (
    req: Request<DeleteSeatInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { seatId } = req.params;
    const seat: ISeat | null = await Seat.findById(seatId);
    if (!seat) {
      next(new ErrorResponse("Seat not found", 404));
    } else {
      await seat.deleteOne();
      res.json({ message: "Seat deleted successfully" });
    }
  }
);
