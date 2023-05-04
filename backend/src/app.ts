import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import connectDatabase from '@util/database';
import swaggerDocs from "@util/swagger";
import { errorHandler } from '@middleware/errorHandler';
import logger from "@util/logger";

import movieRouter from '@route/movie.route';
import cinemaRouter from '@route/cinema.route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT
const mode = process.env.NODE_ENV

app.set("trust proxy", 1)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['http://127.0.0.1:5000'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
  })
);
app.use("/static", cors(), express.static(path.join(__dirname, '/static')))

app.use('/api', movieRouter);
app.use('/api', cinemaRouter);
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Root Endpoint: Test API');
});

app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port} in ${mode} mode.`);

  await connectDatabase();

  swaggerDocs(app, port!);
});
