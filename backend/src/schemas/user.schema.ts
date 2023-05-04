import { object, string, number, date, array, TypeOf,boolean } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user.
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user.
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           minLength: 6
 *           description: Password of the user.
 *           example: secret
 *         avatar:
 *           type: string
 *           description: URL of the user's avatar.
 *           example: https://example.com/avatar.jpg
 *         isAdmin:
 *           type: boolean
 *           description: Whether the user is an administrator.
 *           example: false
 *       required:
 *         - name
 *         - email
 *         - password
 *         - avatar
 *         - isAdmin
 */


const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email({
      message: "Invalid email format",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, {
      message: "Password must be at least 6 characters long",
    }),
    avatar: string({
      required_error: "Avatar is required",
    }),
    isAdmin: boolean({
      required_error: "isAdmin is required",
    }),
  }),
};

const params = {
    params: object({
      userId: string({
        required_error: "userId is required",
      }),
    }),
  };
    
  export const getUserSchema = object({
    ...params,
  });
  
  export const createUserSchema = object({
    ...payload,

  });
  
  export const updateUserSchema = object({
    ...params,
    ...payload,
  });
  
  export const deleteUserSchema = object({
    ...params,
  });
  
  export type GetUserInput = TypeOf<typeof getUserSchema>;
  export type CreateUserInput = TypeOf<typeof createUserSchema>;
  export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
  export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;