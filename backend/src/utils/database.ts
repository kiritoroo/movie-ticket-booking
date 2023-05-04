import mongoose from 'mongoose';
import logger from "@util/logger";

const connectDatabase = (): void => {
mongoose.connect(process.env.DB_URI!, {})
  .then(con => {
    logger.info(`MongoDB Database connected with HOST: ${con.connection.host}`);
  })
  .catch(err => {
    logger.error(`MongoDB Database connection error: ${err.message}`);
  });
};

export default connectDatabase;