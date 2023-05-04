import { Router, Request, Response } from "express";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "@controller/user.controller";
import { validateResource } from "@middleware/validateResource";
import {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
} from "@schema/user.schema";

const userRouter = Router();

/**
 * @openapi
 * tags:
 *   name: User
 *   description: API endpoints for managing users
 *
 */

/**
 * @openapi
 * /api/user:
 *   get:
 *     summary: Get all users2
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.route("/user").get((req, res, next) => {
  return getAllUsers(req, res, next);
});

/**
 * @openapi
 * /api/users/{userId}:
 *   get:
 *     tags: [User]
 *     description: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to get
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter
  .route("/users/:userId")
  .get([validateResource(getUserSchema)], getUserById);

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags: [User]
 *     description: Create a new user
 *     requestBody:
 *       description: User object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       '201':
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter
  .route("/users")
  .post([validateResource(createUserSchema)], createUser);

/**
 * @openapi
 * /api/users/{userId}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       '200':
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid request body or parameters
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
userRouter
  .route("/users/:userId")
  .put([validateResource(updateUserSchema)], updateUser);

/**
 * @openapi
 * /api/users/{userId}:
 *   delete:
 *     tags: [User]
 *     summary: Delete user by ID
 *     description: Deletes a user with the specified ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       204:
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter
  .route("/users/:userId")
  .delete([validateResource(deleteUserSchema)], deleteUser);

export default userRouter;
