import { Request, Response, NextFunction } from 'express';
import { Movie, IMovie } from '@model/movie';
import { catchAsyncErrors } from "@middleware/catchAsyncErrors";

export const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
  const movies: IMovie[] = await Movie.find().populate('genres');
  res.json(movies);
}

export const getMovieById = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const movie: IMovie | null = await Movie.findById(req.params.id).populate('genres');
  if (!movie) {
    res.status(404).json({ message: 'Movie not found' });
  } else {
    res.json(movie);
  }
})

export const createMovie = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const movie: IMovie = new Movie(req.body);
  await movie.save();
  res.status(201).json(movie);
})

export const updateMovie = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const movie: IMovie | null = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404).json({ message: 'Movie not found' });
  } else {
    movie.title = req.body.title || movie.title;
    movie.overview = req.body.overview || movie.overview;
    movie.runtime = req.body.runtime || movie.runtime;
    movie.director = req.body.director || movie.director;
    movie.actors = req.body.actors || movie.actors;
    movie.mpaaRating = req.body.mpaaRating || movie.mpaaRating;
    movie.imdbScore = req.body.imdbScore || movie.imdbScore;
    movie.rating = req.body.rating || movie.rating;
    movie.country = req.body.country || movie.country;
    movie.language = req.body.language || movie.language;
    movie.releaseDate = req.body.releaseDate || movie.releaseDate;
    movie.posterPath = req.body.posterPath || movie.posterPath;
    movie.trailerPath = req.body.trailerPath || movie.trailerPath;
    movie.genres = req.body.genres || movie.genres;
    const updatedMovie: IMovie = await movie.save();
    res.json(updatedMovie);
  }
})

export const deleteMovie = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const movie: IMovie | null = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404).json({ message: 'Movie not found' });
  } else {
    await movie.deleteOne();
    res.json({ message: 'Movie deleted successfully' });
  }
})
