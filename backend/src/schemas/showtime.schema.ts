import { object, string, array,TypeOf } from "zod";

 /**
   * @openapi
   * components:
   *   schemas:
   *     Showtimes:
   *       type: object
   *       properties:
   *         name:
   *           type: string
   *           description: name of showtimes
   */

const payload = {
  body: object({
    movie: string({
      required_error: "Movie is required",
    }),
    cinema: string({
      required_error: "Cinema is required",
    }),
    startAt: string({
      required_error: "Start time is required",
    }),
    endAt: string({
      required_error: "End time is required",
    }),
    seats: array(
      string({
        required_error: "At least one seat is required",
      })
    ),
  }),
};

const params = {
    params: object({
      showtimeId: string({
        required_error: "showtimeId is required",
      }),
    }),
  };
  
  export const getShowtimeSchema = object({
    ...params,
  });
  
  export const createShowtimeSchema = object({
    ...payload,
  });
  
  export const updateShowtimeSchema = object({
    ...params,
    ...payload,
  });
  
  export const deleteShowtimeSchema = object({
    ...params,
  });
  
  export type GetShowtimeInput = TypeOf<typeof getShowtimeSchema>;
  export type CreateShowtimeInput = TypeOf<typeof createShowtimeSchema>;
  export type UpdateShowtimeInput = TypeOf<typeof updateShowtimeSchema>;
  export type DeleteShowtimeInput = TypeOf<typeof deleteShowtimeSchema>;
  
