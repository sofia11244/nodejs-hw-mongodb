// src/index.js

import { initMongoDB } from './db/initMongoDB.js';
import { SetupServer } from './server.js';

const bootstrap = async () => {
  await initMongoDB();
  
  SetupServer();
};

bootstrap();
