export default (): any => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  NODE_ENV: process.env.NODE_ENV || 'dvelopment',
  database: {
    MONGO_DB_URI: `mongodb://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_PASSWORD}@ds029735.mlab.com:29735/${process.env.MONGO_DB_NAME}`,
    NAME: process.env.MONGO_DB_NAME,
    PASSWORD: process.env.MONGO_DB_PASSWORD,
  },
  enable_cors: true,
  rate_limit: {
    max: 100,
    minutes: 10,
  },
});
