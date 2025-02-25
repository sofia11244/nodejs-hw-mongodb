// src/index.js

import { initMongoDB } from './db/initMongoDB.js';
import { SetupServer } from './server.js';
import dotenv from 'dotenv';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

dotenv.config();

const bootstrap = async () => {
  await initMongoDB();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  SetupServer();
  
};

void bootstrap();