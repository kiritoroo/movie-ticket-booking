import { Router, Request, Response } from 'express';
import {
  getAllShowtimes,
  getShowtimeById,
  createShowtime,
  updateShowtime,
  deleteShowtime
} from '@controller/showtime.controller';
import { validateResource } from "@middleware/validateResource";

import {
  getShowtimeSchema,
  createShowtimeSchema,
  updateShowtimeSchema,
  deleteShowtimeSchema
} from '@schema/showtime.schema';

const showtimeRouter = Router();

  /**
   * @openapi
   * tags:
   *   name: Showtimes
   *   description: Showtime management
   *
   */


  /**
   * @openapi
   * /api/showtimes:
   *   get:
   *     summary: Get all showtimes
   *     tags: [Showtimes]
   *     responses:
   *       '200':
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Showtime'
   *       '500':
   *         description: Internal Server Error
   */
showtimeRouter.route('/showtimes').get(
  (req, res, next) => {
    return getAllShowtimes(req, res, next);
  }
)

/**
 * @openapi
 * /api/showtimes/{showtimeId}:
 *   get:
 *     summary: Get showtime by ID
 *     tags: [Showtimes]
 *     parameters:
 *       - in: path
 *         name: showtimeId
 *         required: true
 *         description: ID of the showtime to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Showtime'
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */
showtimeRouter.route('/showtimes/:showtimeId').get(
  (req, res, next) => {
    return getShowtimeById(req, res, next);
  }
);

/**
 * @openapi
 * /api/showtimes:
 *   post:
 *     summary: Create a new showtime
 *     tags: [Showtimes]
 *     requestBody:
 *       description: Showtime object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShowtimeInput'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Showtime'
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */

showtimeRouter.route('/showtimes').post(
  [validateResource(createShowtimeSchema)],
  createShowtime
  )


/**
 * @openapi
 * /api/showtimes/{showtimeId}:
 *   put:
 *     summary: Update showtime by ID
 *     tags: [Showtimes]
 *     parameters:
 *       - in: path
 *         name: showtimeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the showtime to update
 *     requestBody:
 *       description: Showtime object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Showtime'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Showtime'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Showtime not found
 *       '500':
 *         description: Internal Server Error
 */
showtimeRouter.route('/showtimes/:showtimeId').put(
    [validateResource(updateShowtimeSchema)],
    updateShowtime
  )
  
  
   /**
   * @openapi
   * /api/showtimes/{showtimeId}:
   *   delete:
   *     summary: Delete a showtime
   *     tags: [Showtimes]
   *     parameters:
   *       - in: path
   *         name: showtimeId
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the showtime to delete
   *     responses:
   *       '204':
   *         description: No Content
   *       '404':
   *         description: Not Found
   *       '500':
   *         description: Internal Server Error
   */
  showtimeRouter.route('/showtimes/:showtimeId').delete(
    [validateResource(deleteShowtimeSchema)],
    deleteShowtime
  )
  
  export default showtimeRouter;
  