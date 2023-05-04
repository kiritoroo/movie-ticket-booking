import { Router, Request, Response } from 'express';

import { 
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} from '@controller/movie.controller';
import { validateResource } from "@middleware/validateResource";
import {
  getMovieSchema,
  createMovieSchema,
  updateMovieSchema,
  deleteMovieSchema
} from "@schema/movie.schema"

const movieRouter = Router();

  /**
   * @openapi
   * tags:
   *   name: Movies
   *   description: Movie management
   *
   */

  /**
   * @openapi
   * /api/movies:
   *   get:
   *     tags:
   *       - Movies
   *     summary: Get all movies
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Movie'
   */
movieRouter.route('/movies').get(
  (req, res, next) => {
    return getAllMovies(req, res, next);
  }
)

/**
 * @openapi
 * '/api/movies/{movieId}':
 *   get:
 *     tags:
 *       - Movies
 *     summary: Get a single movie by ID
 *     parameters:
 *       - name: movieId
 *         in: path
 *         description: The ID of the movie to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 */
movieRouter.route('/movies/:movieId').get(
  [validateResource(getMovieSchema)],
  getMovieById
)

/**
 * @openapi
 * '/api/movies':
 *   post:
 *     tags:
 *       - Movies
 *     summary: Create a new movie
 *     requestBody:
 *       description: Movie object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Bad request
 */

movieRouter.route('/movies').post(
  [validateResource(createMovieSchema)],
  createMovie
)

/**
 * @openapi
 * '/api/movies/{movieId}':
 *   put:
 *     tags:
 *       - Movies
 *     summary: Update an existing movie by ID
 *     parameters:
 *       - name: movieId
 *         in: path
 *         description: The ID of the movie to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Movie object to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Movie not found
 */
movieRouter.route('/movies/:movieId').put(
  [validateResource(updateMovieSchema)],
  updateMovie
)

/**
 * @openapi
 * '/api/movies/{movieId}':
 *   delete:
 *     tags:
 *       - Movies
 *     summary: Delete an existing movie by ID
 *     parameters:
 *       - name: movieId
 *         in: path
 *         description: The ID of the movie to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 */

movieRouter.route('/movies/:movieId').delete(
  [validateResource(deleteMovieSchema)],
  deleteMovie
)

export default movieRouter;
