import express from 'express';
import cors from 'cors';
import pino from 'pino';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = process.env.PORT || 5000;
const logger = pino({ level: 'info' });

export const SetupServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    logger.info('GET request received on /');
    res.json({ message: '3rd Homework is Hereee!' });
  });

  app.use('/contacts', contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port "${PORT}"`);
  });
};
