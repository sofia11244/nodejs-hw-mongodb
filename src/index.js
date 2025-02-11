// src/index.js

import { initMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';
import dotenv from 'dotenv';
dotenv.config();
const bootstrap = async () => {
  await initMongoDB();
  startServer();
};

bootstrap();
