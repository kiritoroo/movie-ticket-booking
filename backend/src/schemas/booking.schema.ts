import { object, string, number, array, TypeOf } from "zod";

  /**
   * @openapi
   * components:
   *   schemas:
   *     Booking:
   *       type: object
   *       properties:
   *         name:
   *           type: string
   */

const payload = {
  body: object({
    user: string({
      required_error: "User is required",
    }),
    showtime: string({
      required_error: "Showtime is required",
    }),
    seats: array(
      string({
        required_error: "At least one seat is required",
      })
    ),
    totalPrice: number({
      required_error: "Total price is required",
    }),
  }),
};

const params = {
  params: object({
    bookingId: string({
      required_error: "bookingId is required",
    }),
  }),
};

export const getBookingSchema = object({
  ...params,
});

export const createBookingSchema = object({
  ...payload,
});

export const updateBookingSchema = object({
  ...params,
  ...payload,
});

export const deleteBookingSchema = object({
  ...params,
});

export type GetBookingInput = TypeOf<typeof getBookingSchema>;
export type CreateBookingInput = TypeOf<typeof createBookingSchema>;
export type UpdateBookingInput = TypeOf<typeof updateBookingSchema>;
export type DeleteBookingInput = TypeOf<typeof deleteBookingSchema>;
