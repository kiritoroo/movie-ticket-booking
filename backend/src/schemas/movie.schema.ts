import { object, string, number, date, array, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Movie title
 *           example: The Shawshank Redemption
 *         overview:
 *           type: string
 *           description: Movie overview
 *           example: Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.
 *         runtime:
 *           type: number
 *           description: Movie runtime in minutes
 *           example: 142
 *         director:
 *           type: string
 *           description: Movie director
 *           example: Frank Darabont
 *         actors:
 *           type: array
 *           description: List of movie actors
 *           items:
 *             type: string
 *           example:
 *             - Tim Robbins
 *             - Morgan Freeman
 *         mpaaRating:
 *           type: string
 *           description: Movie MPAA rating
 *           example: R
 *         imdbScore:
 *           type: number
 *           description: Movie IMDb score
 *           example: 9.3
 *         rating:
 *           type: number
 *           description: Movie rating
 *           example: 8.7
 *         country:
 *           type: number
 *           description: Movie country of origin
 *           example: United States
 *         language:
 *           type: array
 *           description: List of movie languages
 *           items:
 *              type: string
 *           example: 
 *             - English
 *             - japan
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: Movie release date
 *           example: 1994-09-23
 *         posterPath:
 *           type: string
 *           description: URL path to movie poster image
 *           example: /static/images/poster/poster_turning-red.jpg
*         thumbPath:
 *           type: string
 *           description: URL path to movie thumb image
 *           example: /static/images/thumb/thumb_turning-red.jpg
 *         trailerPath:
 *           type: string
 *           description: URL path to movie trailer video
 *           example: https://www.youtube.com/watch?v=XdKzUbAiswE
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *           description: List of movie genres
 *           example:
 *             - id
 *             - id
 */


const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    overview: string({
      required_error: "Overview is required",
    }),
    runtime: number({
      required_error: "Runtime is required",
    }),
    director: string({
      required_error: "Director is required",
    }),
    actors: array(string({
      required_error: "At least one actor is required",
    })),
    mpaaRating: string({
      required_error: "MPAA rating is required",
    }),
    imdbScore: number({
      required_error: "IMDb score is required",
    }),
    rating: number({
      required_error: "Rating is required",
    }),
    country: string({
      required_error: "Country is required",
    }),
    language: array(string({
      required_error: "At least one language is required",
    })),
    releaseDate: date({
      required_error: "Release date is required",
    }),
    posterPath: string({
      required_error: "Poster path is required",
    }),
    thumbPath: string({
      required_error: "Thumb path is required",
    }),
    trailerPath: string({
      required_error: "Trailer path is required",
    }),
    genres: array(string({
      required_error: "At least one genre is required",
    })),
  }),
};

const params = {
  params: object({
    movieId: string({
      required_error: "movieId is required",
    }),
  }),
};

export const getMovieSchema = object({
  ...params,
});

export const createMovieSchema = object({
  ...payload,
});

export const updateMovieSchema = object({
  ...payload,
  ...params,
});

export const deleteMovieSchema = object({
  ...params,
});

export type GetMovieInput = TypeOf<typeof getMovieSchema>;
export type CreateMovieInput = TypeOf<typeof createMovieSchema>;
export type UpdateMovieInput = TypeOf<typeof updateMovieSchema>;
export type DeleteMovieInput = TypeOf<typeof deleteMovieSchema>;
