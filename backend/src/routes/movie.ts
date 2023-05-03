import { Router, Request, Response } from 'express';

import { 
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} from '@controller/movie';

const movieRouter = Router();

movieRouter.route('/movies').get(
  (req, res, next) => {
    return getAllMovies(req, res, next);
  }
)


movieRouter.route('/movies/:id').get(
  (req, res, next) => {
    return getMovieById(req, res, next);
  }
)

movieRouter.route('/movies').post(
  (req, res, next) => {
    return createMovie(req, res, next);
  }
)

movieRouter.route('/movies/:id').put(
  (req, res, next) => {
    return updateMovie(req, res, next);
  }
)

movieRouter.route('/movies/:id').delete(
    (req, res, next) => {
    return deleteMovie(req, res, next);
  }
)

export default movieRouter;
