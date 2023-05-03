import mongoose from 'mongoose';

const connectDatabase = (): void => {
mongoose.connect(process.env.DB_URI!, {})
  .then(con => {
    console.log(`📢 [db]: MongoDB Database connected with HOST: ${con.connection.host}`);
  })
  .catch(err => {
    console.error(`❗ [db]: MongoDB Database connection error: ${err.message}`);
  });
};

export default connectDatabase;