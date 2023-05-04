import { Request, Response, NextFunction } from "express";
import { User, IUser } from "@model/user.model";
import { catchAsyncErrors } from "@middleware/catchAsyncErrors";
import ErrorResponse from "@util/ErrorResponse";
import {
  GetUserInput,
  CreateUserInput,
  UpdateUserInput,
  DeleteUserInput,
} from "@schema/user.schema";

export const getAllUsers = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const users: IUser[] = await User.find();
    res.json(users);
  }
);

export const getUserById = catchAsyncErrors(
  async (
    req: Request<GetUserInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req.params;

    const user: IUser | null = await User.findById(userId);
    if (!user) {
      next(new ErrorResponse("User not found", 404));
    } else {
      res.json(user);
    }
  }
);

export const createUser = catchAsyncErrors(
  async (
    req: Request<CreateUserInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    const user: IUser = new User(body);
    await user.save();
    res.status(201).json(user);
  }
);

export const updateUser = catchAsyncErrors(
  async (
    req: Request<UpdateUserInput["params"], UpdateUserInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req.params;
    const body = req.body;
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      next(new ErrorResponse("User not found", 404));
    } else {
      const updatedUser: IUser | null = await User.findByIdAndUpdate(
        userId,
        body,
        { new: true }
      );
      res.json(updatedUser);
    }
  }
);

export const deleteUser = catchAsyncErrors(
  async (
    req: Request<DeleteUserInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req.params;
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      next(new ErrorResponse("User not found", 404));
    } else {
      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    }
  }
);
