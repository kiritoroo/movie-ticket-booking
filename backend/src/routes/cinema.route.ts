import { Router, Request, Response } from 'express';
import {
  getAllCinemas,
  getCinemaById,
  createCinema,
  updateCinema,
  deleteCinema
} from '@controller/cinema.controller';
import { validateResource } from "@middleware/validateResource";

import {
  getCinemaSchema,
  createCinemaSchema,
  updateCinemaSchema,
  deleteCinemaSchema
} from '@schema/cinema.schema';

const cinemaRouter = Router();

  /**
   * @openapi
   * tags:
   *   name: Cinemas
   *   description: Cinema management
   *
   */


  /**
   * @openapi
   * /api/cinemas:
   *   get:
   *     summary: Get all cinemas
   *     tags: [Cinemas]
   *     responses:
   *       '200':
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Cinema'
   *       '500':
   *         description: Internal Server Error
   */
cinemaRouter.route('/cinemas').get(
  (req, res, next) => {
    return getAllCinemas(req, res, next);
  }
)

/**
 * @openapi
 * /api/cinemas/{cinemaId}:
 *   get:
 *     summary: Get cinema by ID
 *     tags: [Cinemas]
 *     parameters:
 *       - in: path
 *         name: cinemaId
 *         required: true
 *         description: ID of the cinema to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cinema'
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */
cinemaRouter.route('/cinemas/:cinemaId').get(
  (req, res, next) => {
    return getCinemaById(req, res, next);
  }
);

/**
 * @openapi
 * /api/cinemas:
 *   post:
 *     summary: Create a new cinema
 *     tags: [Cinemas]
 *     requestBody:
 *       description: Cinema object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CinemaInput'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cinema'
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */

cinemaRouter.route('/cinemas').post(
  [validateResource(createCinemaSchema)],
  createCinema
  )


/**
 * @openapi
 * /api/cinemas/{cinemaId}:
 *   put:
 *     summary: Update cinema by ID
 *     tags: [Cinemas]
 *     parameters:
 *       - in: path
 *         name: cinemaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the cinema to update
 *     requestBody:
 *       description: Cinema object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cinema'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cinema'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Cinema not found
 *       '500':
 *         description: Internal Server Error
 */
cinemaRouter.route('/cinemas/:cinemaId').put(
  [validateResource(  updateCinemaSchema, )],
  updateCinema
)


 /**
 * @openapi
 * /api/cinemas/{cinemaId}:
 *   delete:
 *     summary: Delete a cinema
 *     tags: [Cinemas]
 *     parameters:
 *       - in: path
 *         name: cinemaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the cinema to delete
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Internal Server Error
 */
cinemaRouter.route('/cinemas/:cinemaId').delete(
  [validateResource(  deleteCinemaSchema, )],
  deleteCinema
)

export default cinemaRouter;