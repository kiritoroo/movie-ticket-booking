import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request<any>, res: Response<any>, next: NextFunction) => Promise<any>;

export const catchAsyncErrors = (fn: AsyncFunction) => {
  return (req: Request<any>, res: Response<any>, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};