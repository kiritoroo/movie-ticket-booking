import { object, string, number,TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     Seat:
 *       type: object
 *       properties:
 *         showtime:
 *           type: string
 *         row:
 *           type: number
 *           description: The row of the seat
 *         column:
 *           type: number
 *           description: The column of the seat
 *         status:
 *           type: string
 *           enum: [available, booked, blocked]
 *           description: The status of the seat
 */

const payload = {
  body: object({
    showtime: string().nullable(),
    row: number({
      required_error: "Row is required",
    }),
    column: number({
      required_error: "Column is required",
    }),
    status: string({
      required_error: "Status is required",
    })
      .optional()
      .nullable()
      .transform((value) => {
        return value ?? "available";
      })
      .refine((value) => {
        return ["available", "booked", "blocked"].includes(value);
      }, "Status must be one of 'available', 'booked', or 'blocked'"),
  }),
};

const params = {
    params: object({
      seatId: string({
        required_error: "SeatId is required",
      }),
    }),
  };
export const getSeatSchema = object({
  ...params,
});

export const createSeatSchema = object({
  ...payload,
});

export const updateSeatSchema = object({
  ...payload,
  ...params,
});

export const deleteSeatSchema = object({
  ...params,
});

export type GetSeatInput = TypeOf<typeof getSeatSchema>;
export type CreateSeatInput = TypeOf<typeof createSeatSchema>;
export type UpdateSeatInput = TypeOf<typeof updateSeatSchema>;
export type DeleteSeatInput = TypeOf<typeof deleteSeatSchema>;
  
