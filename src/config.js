// filepath: /c:/projects/nodejs-hw-mongodb/src/config.js
export const config = {
    mongodb: {
      user: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD,
      url: process.env.MONGODB_URL,
      db: process.env.MONGODB_DB,
    },
    smtp: {
      user: process.env.SMTP_USER,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      password: process.env.SMTP_PASSWORD,
      from: process.env.SMTP_FROM,
    },
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
    jwtSecret: process.env.JWT_SECRET,
    appDomain: process.env.APP_DOMAIN,
  };