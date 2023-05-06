import { Router, Request, Response } from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "@controller/booking.controller";
import { validateResource } from "@middleware/validateResource";

import {
  getBookingSchema,
  createBookingSchema,
  updateBookingSchema,
  deleteBookingSchema,
} from "@schema/booking.schema";

const bookingRouter = Router();
/**
 * @openapi
 * tags:
 *   name: Bookings
 *   description: Booking management
 */

/**
 * @openapi
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags:
 *       - Bookings
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       '500':
 *         description: Internal Server Error
 */

bookingRouter.route("/bookings").get((req, res, next) => {
  return getAllBookings(req, res, next);
});

/**
 * @openapi
 * /bookings/{bookingId}:
 *   get:
 *     summary: Get a booking by ID
 *     tags:
 *       - Bookings
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         description: ID of the booking
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       '404':
 *         description: Booking not found
 *       '500':
 *         description: Internal Server Error
 */

bookingRouter.route("/bookings/:bookingId").get((req, res, next) => {
  return getBookingById(req, res, next);
});

/**
 * @openapi
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags:
 *       - Bookings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingInput'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */

bookingRouter
  .route("/bookings")
  .post([validateResource(createBookingSchema)], createBooking);

/**
 * @openapi
 * /bookings/{bookingId}:
 *   put:
 *     summary: Update a booking by ID
 *     tags:
 *       - Bookings
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         description: ID of the booking
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBookingInput'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: Booking not found
 *       '500':
 *         description: Internal Server Error
 */

bookingRouter
  .route("/bookings/:bookingId")
  .put([validateResource(updateBookingSchema)], updateBooking);

/**
 * @openapi
 * /bookings/{bookingId}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags:
 *       - Bookings
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         description: ID of the booking
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       '404':
 *         description: Booking not found
 *       '500':
 *         description: Internal Server Error
 */

bookingRouter
  .route("/bookings/:bookingId")
  .delete([validateResource(deleteBookingSchema)], deleteBooking);
  
export default bookingRouter;
