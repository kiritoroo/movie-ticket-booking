import { Request, Response, NextFunction } from 'express';
import { Movie, IMovie } from '@model/movie.model';
import { catchAsyncErrors } from "@middleware/catchAsyncErrors";
import ErrorResponse from '@util/ErrorResponse';
import {
  GetMovieInput,
  CreateMovieInput,
  UpdateMovieInput,
  DeleteMovieInput
} from "@schema/movie.schema"

export const getAllMovies = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const movies: IMovie[] = await Movie.find().populate('genres');
  res.json(movies);
})

export const getMovieById = catchAsyncErrors(async (
  req: Request<GetMovieInput["params"]>,
  res: Response,
  next: NextFunction
) => {
  const { movieId } = req.params;
  console.log(movieId)

  const movie: IMovie | null = await Movie.findById(movieId).populate('genres');
  if (!movie) {
    next(new ErrorResponse('Movie not found', 404))
  } else {
    res.json(movie);
  }
})

export const createMovie = catchAsyncErrors(async (
  req: Request<CreateMovieInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const movie: IMovie = new Movie(body);
  await movie.save();
  res.status(201).json(movie);
})

export const updateMovie = catchAsyncErrors(async (
  req: Request<UpdateMovieInput["params"]>,
  res: Response,
  next: NextFunction
) => {
  const { movieId } = req.params;
  const body = req.body;
  const movie: IMovie | null = await Movie.findById(movieId);
  if (!movie) {
    next(new ErrorResponse('Movie not found', 404))
  } else {
    const updatedMovie: IMovie | null = await Movie.findOneAndUpdate({ movieId }, body, { new: true});
    res.json(updatedMovie);
  }
})

export const deleteMovie = catchAsyncErrors(async (
  req: Request<DeleteMovieInput["params"]>,
  res: Response,
  next: NextFunction
) => {
  const { movieId } = req.params;
  const movie: IMovie | null = await Movie.findById(movieId);
  if (!movie) {
    next(new ErrorResponse('Movie not found', 404))
  } else {
    await movie.deleteOne();
    res.json({ message: 'Movie deleted successfully' });
  }
})
