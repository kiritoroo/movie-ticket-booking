TODO: Cinemas
  # [v] Step 0: Create Cinema Model
    > 0.Create a new file at [](./src/models/cinema.model.ts) 
    > 1.The Cinema model should have the following properties:
      - id (string): a unique identifier for the cinema
      - name (string): the name of the cinema
      - address (string): the address of the cinema
      - phone (string): the phone number of the cinema

  # [x] Step 1: Create Cinema Data
    > 0.Create a new file at [](./src/data/cinemas.json)
    > 1.Using GPT add an array of cinema objects to the file, with each object containing the following properties:
      - name (string): the name of the cinema
      - location (string): the location of the cinema
      - address (string): the address of the cinema
      - phone (string): the phone number of the cinema
      - showtimes: alway []
    > 2.Create a function named seedCinemas() in [](./src/utils/seeder.ts) that reads the cinemas data file and inserts the cinemas into the database.
    > 3.Run "npm run seed" to seed all cinema data in the database.

  # [x] Step 2: Create Cinema Schema
    > 0.Create a new file at [](./src/schemas/cinema.schema.ts)
    > 1.Define a all schema object using 'zod' validation library
    > 3.Skip openapi annotations for now.

  # [x] Step 3: Create Cinema Controller
    > 0.Create controller [](./src/controllers/cinema.controller.ts)
    > 1.Define a CinemaController class that exports the following methods:
      - getCinemas(): retrieves all cinemas from the database and returns them as a JSON response.
      - getCinemaById(): retrieves a cinema by its id from the database and returns it as a JSON response. If the cinema is not found, returns a 404 status code and an error message.
      - createCinema(): creates a new cinema in the database with the provided data in the request body and returns it as a JSON response. If the request data is invalid, returns a 400 status code and an error message.
      - updateCinema(): updates an existing cinema in the database with the provided data in the request body and returns it as a JSON response. If the cinema is not found or the request data is invalid, returns a 404 or 400 status code and an error message, respectively.
      - deleteCinema(): deletes a cinema by its id from the database and returns a success message. If the cinema is not found, returns a 404 status code and an error message.

  # [x] Step 4: Create Cinema Routes
    > 0.Create routes [](./src/routes/cinema.route.ts)
    > 1.Define a router object using the express library that maps each controller method to a specific HTTP request method and URL path. For example:
      - GET /cinemas: maps to CinemaController.getCinemas()
      - GET /cinemas/:cinemaId: maps to CinemaController.getCinemaById()
      - POST /cinemas: maps to CinemaController.createCinema()
      - PUT /cinemas/:cinemaId: maps to CinemaController.updateCinema()
      - DELETE /cinemas/:cinemaId: maps to CinemaController.deleteCinema()
    > 3.Skip openapi annotations for now.

  # [x] Step 5: Create openapi annotations
    > 1.In schema [](./src/schemas/cinema.schema.ts), using GPT add OpenAPI annotations to each schema object and property.
    > 2.in route [](./src/routes/cinema.route.ts), using GPT add OpenAPI annotations to each router object and method.
