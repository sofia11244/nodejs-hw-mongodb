// src/index.js

import { initMongoDB } from './db/initMongoDB.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { SetupServer } from './server.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

import dotenv from 'dotenv';
dotenv.config();
const bootstrap = async () => {
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  await initMongoDB();
  SetupServer();
};

bootstrap();
