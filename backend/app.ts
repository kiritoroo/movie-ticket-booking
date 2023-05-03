import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDatabase from '@util/database';
import movieRouter from '@route/movie';
import swaggerDocs from "@util/swagger";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

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

app.use('/api', movieRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Root Endpoint: Test API');
});

app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

  await connectDatabase();

  swaggerDocs(app, port!);
});
