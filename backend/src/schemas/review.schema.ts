import { object, string, number, TypeOf } from "zod";
/**
 * @openapi
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *         movie:
 *           type: string
 *         rating:
 *           type: number
 *         comment:
 *           type: string
 *       example:
 *         comment: "Great movie, highly recommend!"
 */

const payload = {
  body: object({
    user: string({
      required_error: "User is required",
    }),
    movie: string({
      required_error: "Movie is required",
    }),
    rating: number({
      required_error: "Rating is required",
    }),
    comment: string({
      required_error: "Comment is required",
    }),
  }),
};
const params = {
  params: object({
    reviewId: string({
      required_error: "reviewId is required",
    }),
  }),
};

export const getReviewSchema = object({
  ...params,
});

export const createReviewSchema = object({
  ...payload,
});

export const updateReviewSchema = object({
  ...params,
  ...payload,
});

export const deleteReviewSchema = object({
  ...params,
});

export type GetReviewInput = TypeOf<typeof getReviewSchema>;
export type CreateReviewInput = TypeOf<typeof createReviewSchema>;
export type UpdateReviewInput = TypeOf<typeof updateReviewSchema>;
export type DeleteReviewInput = TypeOf<typeof deleteReviewSchema>;
