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
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || 'ufarm-service',
  FIREBASE_PRIVATE_KEY:
    process.env.FIREBASE_PRIVATE_KEY ||
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCgFpedj/utPTFK\njflwzMTf9vPrZWdisQNwoxOHguUyqMLfQsKTEFOt/Qw8gliC8YEx+0EnNxkmgf4m\nmlNcDcY3icLcqtpGLtNqatuf9AUgVS4SOHlYG3Xaqy4IZQea60Kt6AJ/nAkBDL/k\n2cexwIRBa4TF/cw5k1Z0F7Kbl2nY2r2kwm5bk7MGqyV9Qb5XS1e+kgD1MMKu8Y90\nwfY4pY6Ke612uzOcuFqg4DwvQ9Swx4dbmWn7R7JmFwayYc6De3F4PDXk56esxyAU\nDLwNR1pchtchirL2s3oJkNfI5orm92aslGwOkbSboG+YGJdNMOpnCeKfQJD+cblN\njxxpZMHnAgMBAAECggEAG3UUhxVBdOqocCGetV6hq8o29tpbG53Bucl2mYj1V7WD\nSviv17p2p8JdnWk71iWm45Q1Dg1Qtn6YQTW583F3XGI39lIlguEYKMnwJmSblnqV\nntFp2pdHJPy0NgNiBQux0ZMYDpwMHU57ATzrF80twey3hp/rrbpcGyhPXYlgQa2p\nLFi6wWO0FM6ZpZSFJVbt37CW3m0ooLdQ25cq/6j3nQN8DZlS8eB0UKIM0nyQ0YjU\nmNT5+wPiiAQ9zlgBw1kfCY7GADIq/fVleWsrvDICGL+16S8OotJjAZXQw0ZemBmd\nD+Q+Usd2COWFTOqynyvE33inISNWHQcREGVHN8lZXQKBgQDbMV4UhaEZr4iAEIdW\n5MEIHW7PdqQxV/d6Su7EmUQzp8tmllKlU9kwXjHY7ffv91BSAtY1vWDENW+7Sjf4\ndMXDE+kecetu9FYyAfjny43q7jwgyXR7wIQ7jKYasdWmA0M4kNuvZegBSSK1vEd7\nvQFoMUfmalg4/nZLMfLtbhff/QKBgQC6+HHMD1o5lWLWhebgy3Cgq7qE4kSTTR3f\nHvX4Clqv6mVHKM0GmWrFKUSCPUSTZ6HoemYyNCJ/MB+bPfF3VDt8VxjDl9S8uGMB\nNKVylxE8oDUJ1r/egbGfTeEzD7rAXuwN6n+UJ0Lu+P8PPiWiqo+vgOn5tMnvBcwI\nn89YMO70swKBgHBaoMfSK17YLBbA4i63OP7o31j2jnlAhvknmbYqfdwggVFHcnuO\nPEDft5tjd3iIg6JWE+kd9pD8dxZAl+oCKTCybwcNC8om8lvVyPk/zLIEhcukl9Gr\nP9yqXqZGS6Y5++Xt0r3YdZDbJTCUnuudWTBIOnuwPSKRxJ8MrmHn0dMdAoGAcwvI\nye1wcRpQtPuzswK7jMHehUHNPG4pQU+FvlhwsOoj44NhlPv1zNe1xgX5GlKcN7aJ\nB784stZjvFyDJg/4gmv9Wu0kA/PZR7ajTz1RZ+KUgDdZ3IolR4beWVMGcLR3v6BZ\nXEpET1N7bl+pPMyCmVVTo0jxMFh60Zu0M+n4Py0CgYAtpiDOtCJI487i61D4+r65\ngT+lg7naQ+PGW1sLLRxVt6sbm2Ca+l1DUg8/iYS+d4+uo04NBn+eVYoPwcXcWYxC\nMhe8RKJpnmnhirt10cHupa3PTJ+fWDYfvOVE6Wx0QeXjjnYTK988JbVn+4DDoCxG\nbpJiMyGUmBkW3otipLktSw==\n-----END PRIVATE KEY-----\n',
  FIREBASE_CLIENT_EMAIL:
    process.env.FIREBASE_CLIENT_EMAIL ||
    'firebase-adminsdk-6b9i4@ufarm-service.iam.gserviceaccount.com',
  FIREBASE_DATABASE_URL:
    process.env.FIREBASE_DATABASE_URL || 'https://ufarm-service.firebaseio.com',
});
