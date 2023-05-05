import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "@middleware/catchAsyncErrors";
import ErrorResponse from "@util/ErrorResponse";
import { Cinema, ICinema } from "@model/cinema.model";


import {
  GetCinemaInput,
  CreateCinemaInput,
  UpdateCinemaInput,
  DeleteCinemaInput,
} from "@schema/cinema.schema";

export const getAllCinemas = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const cinemas: ICinema[] = await Cinema.find();
    res.json(cinemas);
  }
);

export const getCinemaById = catchAsyncErrors(
  async (
    req: Request<GetCinemaInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { cinemaId } = req.params;
    const cinema: ICinema | null = await Cinema.findById(cinemaId);
    if (!cinema) {
      next(new ErrorResponse("Cinema not found", 404));
    } else {
      res.json(cinema);
    }
  }
);

export const createCinema = catchAsyncErrors(
  async (
    req: Request<CreateCinemaInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    const cinema: ICinema = new Cinema(body);
    await cinema.save();
    res.status(201).json(cinema);
  }
);

export const updateCinema = catchAsyncErrors(
  async (
    req: Request<UpdateCinemaInput["params"], UpdateCinemaInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { cinemaId } = req.params;
    const body = req.body;
    const cinema: ICinema | null = await Cinema.findById(cinemaId);
    if (!cinema) {
      next(new ErrorResponse("Cinema not found", 404));
    } else {
      await Cinema.updateOne({ _id: cinemaId }, body);
      const updatedCinema: ICinema | null = await Cinema.findById(cinemaId);
      res.json(updatedCinema);
    }
  }
);

export const deleteCinema = catchAsyncErrors(
  async (
    req: Request<DeleteCinemaInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { cinemaId } = req.params;
    const cinema: ICinema | null = await Cinema.findById(cinemaId);
    if (!cinema) {
      next(new ErrorResponse("Cinema not found", 404));
    } else {
      await cinema.deleteOne();
      res.json({ message: "Cinema deleted successfully" });
    }
  }
);
