// src/index.js

import { initMongoDB } from './db/initMongoDB.js';
import { SetupServer } from './server.js';
import dotenv from 'dotenv';
dotenv.config();
const bootstrap = async () => {
  await initMongoDB();
  SetupServer();
};

bootstrap();
