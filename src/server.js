import express from 'express';
import cors from 'cors';
import pino from 'pino';
import contactsRouter from './routers/contacts.js';

const PORT = process.env.PORT || 5000;
const logger = pino({ level: 'info' });

export const SetupServer = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    logger.info('GET request received on /');
    res.json({ message: 'Hi there!' });
  });

  // Yeni yönlendirme
  app.use('/contacts', contactsRouter);

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port "${PORT}"`);
  });
};
