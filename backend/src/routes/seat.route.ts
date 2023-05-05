import { Router, Request, Response } from 'express';
import {
  getAllSeats,
  getSeatById,
  createSeat,
  updateSeat,
  deleteSeat
} from '@controller/seat.controller';
import { validateResource } from "@middleware/validateResource";

import {
  getSeatSchema,
  createSeatSchema,
  updateSeatSchema,
  deleteSeatSchema
} from '@schema/seat.schema';

const seatRouter = Router();

/**
* @openapi
* tags: 
*   name: Seats
*   description: Seat management
*
*/

/**
 * @openapi
 * /api/seats:
 *   get:
 *     summary: Get all seats
 *     tags: [Seats]
 *     description: Retrieve a list of all seats
 *     responses:
 *       '200':
 *         description: A list of seats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Seat'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
seatRouter.route("/seats").get((req, res, next) => {
  return getAllSeats(req, res, next);
});

/**
 * @openapi
 * /api/seats/{seatId}:
 *   get:
 *     summary: Get a seat by ID
 *     tags: [Seats]
 *     description: Retrieve a seat by ID
 *     parameters:
 *       - $ref: '#/components/parameters/SeatIdParam'
 *     responses:
 *       '200':
 *         description: A seat object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seat'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
seatRouter.route('/seats/:seatId').get(
    (req, res, next) => {
      return getSeatById(req, res, next);
    }
  );
/**
 * @openapi
 * /api/seats:
 *   post:
 *     summary: Create a new seat
 *     tags: [Seats]
 *     description: Create a new seat object
 *     requestBody:
 *       description: Seat object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSeatInput'
 *     responses:
 *       '201':
 *         description: A seat object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seat'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
seatRouter
  .route("/seats")
  .post([validateResource(createSeatSchema)], createSeat);

/**
 * @openapi
 * /api/seats/{seatId}:
 *   put:
 *     summary: Update a seat by ID
 *     tags: [Seats]
 *     description: Update a seat object by ID
 *     parameters:
 *       - $ref: '#/components/parameters/SeatIdParam'
 *     requestBody:
 *       description: Seat object to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSeatInput'
 *     responses:
 *       '200':
 *         description: A seat object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seat'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
seatRouter
  .route("/seats/:seatId")
  .put([validateResource(updateSeatSchema)], updateSeat);
/**
 * @openapi
 * /api/seats/{seatId}:
 *   delete:
 *     summary: Delete a seat by ID
 *     tags: [Seats]
 *     description: Delete a seat object by ID
 *     parameters:
 *       - $ref: '#/components/parameters/SeatIdParam'
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */
seatRouter
  .route("//seats/:seatId")
  .delete([validateResource(deleteSeatSchema)], deleteSeat);
  
  
export default seatRouter;
