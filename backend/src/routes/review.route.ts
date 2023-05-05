import { Router, Request, Response } from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "@controller/review.controller";
import { validateResource } from "@middleware/validateResource";

import {
  getReviewSchema,
  createReviewSchema,
  updateReviewSchema,
  deleteReviewSchema,
} from "@schema/review.schema";

const reviewRouter = Router();

/**

/**
 * @openapi
 * tags:
 *   name: Reviews
 *   description: Review management
 */

/**
 * @openapi
 * /api/reviews:
 *   get:
 *     tags: [Reviews]
 *     summary: Get all reviews
 *     responses:
 *       200:
 *         description: An array of review objects
 */

reviewRouter.route("/reviews").get((req, res, next) => {
  return getAllReviews(req, res, next);
});

/**
 * @openapi
 * /api/reviews/{reviewId}:
 *   get:
 *     tags: [Reviews]
 *     summary: Get a review by ID
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the review to get
 *     responses:
 *       200:
 *         description: A review object
 */

reviewRouter.route("/reviews/:reviewId").get((req, res, next) => {
  return getReviewById(req, res, next);
});

/**
 * @openapi
 * /api/reviews:
 *   post:
 *     tags: [Reviews]
 *     summary: Create a new review
 *     requestBody:
 *       description: Review object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Created review object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/ReviewResponse'
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

reviewRouter
  .route("/reviews")
  .post([validateResource(createReviewSchema)], createReview);

/**
 * @openapi
 * /reviews/{reviewId}:
 *   put:
 *     summary: Update an existing review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the review to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Review"
 *     responses:
 *       200:
 *         description: Return the updated review
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Review not found
 */
reviewRouter
  .route("/reviews/:reviewId")
  .put([validateResource(updateReviewSchema)], updateReview);

/**
 * @openapi
 * /reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the review to delete
 *     responses:
 *       204:
 *         description: Review deleted
 *       404:
 *         description: Review not found
 */
reviewRouter
  .route("/reviews/:reviewId")
  .delete([validateResource(deleteReviewSchema)], deleteReview);

  export default reviewRouter;