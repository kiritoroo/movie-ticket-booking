import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "@middleware/catchAsyncErrors";
import ErrorResponse from "@util/ErrorResponse";
import { Review, IReview } from "@model/review.model";

import {
  GetReviewInput,
  CreateReviewInput,
  UpdateReviewInput,
  DeleteReviewInput,
} from "@schema/review.schema";

export const getAllReviews = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviews: IReview[] = await Review.find();
    res.json(reviews);
  }
);

export const getReviewById = catchAsyncErrors(
  async (
    req: Request<GetReviewInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { reviewId } = req.params;
    const review: IReview | null = await Review.findById(reviewId);
    if (!review) {
      next(new ErrorResponse("Review not found", 404));
    } else {
      res.json(review);
    }
  }
);

export const createReview = catchAsyncErrors(
  async (
    req: Request<CreateReviewInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    const review: IReview = new Review(body);
    await review.save();
    res.status(201).json(review);
  }
);

export const updateReview = catchAsyncErrors(
  async (
    req: Request<UpdateReviewInput["params"], UpdateReviewInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { reviewId } = req.params;
    const body = req.body;
    const review: IReview | null = await Review.findById(reviewId);
    if (!review) {
      next(new ErrorResponse("Review not found", 404));
    } else {
      await Review.updateOne({ _id: reviewId }, body);
      const updatedReview: IReview | null = await Review.findById(reviewId);
      res.json(updatedReview);
    }
  }
);

export const deleteReview = catchAsyncErrors(
  async (
    req: Request<DeleteReviewInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { reviewId } = req.params;
    const review: IReview | null = await Review.findById(reviewId);
    if (!review) {
      next(new ErrorResponse("Review not found", 404));
    } else {
      await review.deleteOne();
      res.json({ message: "Review deleted successfully" });
    }
  }
);
