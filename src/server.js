import express from 'express';
import cors from 'cors';
import pino from 'pino';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = process.env.PORT || 8000;
const logger = pino({ level: 'info' });

export const SetupServer = async () => {
  const app = express();
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
  // istek gövdesini işleyebilmek (parse edebilmek) için 
  // Express'te ek bir yapılandırma yapılması gereklidir.

  // Ancak, bu yalnızca istek içerisinde 
  // Content-Type başlığının application/json olarak ayarlandığı durumlarda geçerlidir
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
