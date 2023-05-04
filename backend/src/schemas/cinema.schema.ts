import { object, string, number, date, array, TypeOf } from "zod";

  /**
   * @openapi
   * components:
   *   schemas:
   *     Cinema:
   *       type: object
   *       properties:
   *         name:
   *           type: string
   *           description: name of cinemas
   *           example: CGV...
   */

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    location: string({
      required_error: "Location is required",
    }),
    address: string({
      required_error: "Address is required",
    }),
    phone: string({
      required_error: "Phone is required",
    }),
    showtimes: array(
      string({
        required_error: "At least one showtime is required",
      })
    )
  })
};

const params = {
  params: object({
    cinemaId: string({
      required_error: "cinemaId is required",
    })
  })
};

export const getCinemaSchema = object({
  ...params,
});

export const createCinemaSchema = object({
  ...payload,
});

export const updateCinemaSchema = object({
  ...params,
  ...payload,
});

export const deleteCinemaSchema = object({
  ...params,
});

export type GetCinemaInput  = TypeOf<typeof getCinemaSchema>;
export type CreateCinemaInput = TypeOf<typeof createCinemaSchema>;
export type UpdateCinemaInput = TypeOf<typeof updateCinemaSchema>;
export type DeleteCinemaInput = TypeOf<typeof deleteCinemaSchema>;