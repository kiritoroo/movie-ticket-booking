import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "@middleware/catchAsyncErrors";
import ErrorResponse from "@util/ErrorResponse";
import { Showtime, IShowtime } from "@model/showtime.model";

import {
  GetShowtimeInput,
  CreateShowtimeInput,
  UpdateShowtimeInput,
  DeleteShowtimeInput,
} from "@schema/showtime.schema";

export const getAllShowtimes = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const showtimes: IShowtime[] = await Showtime.find();
    res.json(showtimes);
  }
);

export const getShowtimeById = catchAsyncErrors(
  async (
    req: Request<GetShowtimeInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { showtimeId } = req.params;
    const showtime: IShowtime | null = await Showtime.findById(showtimeId);
    if (!showtime) {
      next(new ErrorResponse("Showtime not found", 404));
    } else {
      res.json(showtime);
    }
  }
);

export const createShowtime = catchAsyncErrors(
  async (
    req: Request<CreateShowtimeInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    const showtime: IShowtime = new Showtime(body);
    await showtime.save();
    res.status(201).json(showtime);
  }
);

export const updateShowtime = catchAsyncErrors(
  async (
    req: Request<UpdateShowtimeInput["params"], UpdateShowtimeInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { showtimeId } = req.params;
    const body = req.body;
    const showtime: IShowtime | null = await Showtime.findById(showtimeId);
    if (!showtime) {
      next(new ErrorResponse("Showtime not found", 404));
    } else {
      await Showtime.updateOne({ _id: showtimeId }, body);
      const updatedShowtime: IShowtime | null = await Showtime.findById(showtimeId);
      res.json(updatedShowtime);
    }
  }
);

export const deleteShowtime = catchAsyncErrors(
  async (
    req: Request<DeleteShowtimeInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { showtimeId } = req.params;
    const showtime: IShowtime | null = await Showtime.findById(showtimeId);
    if (!showtime) {
      next(new ErrorResponse("Showtime not found", 404));
    } else {
      await showtime.deleteOne();
      res.json({ message: "Showtime deleted successfully" });
    }
  }
);
