import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { env } from './utils/env.js';
import mongoose from 'mongoose';
import { getAllContacts, getContactsById } from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

const logger = pino({
  level: 'info',
});

export const SetupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    logger.info('GET request received on /');
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/contacts', async (req, res) => {
    logger.info();
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    logger.info(`Received request to fetch contact with ID: ${contactId}`);
  
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      logger.warn(`Invalid contact ID format: ${contactId}`);
      return res.status(404).json({
        message: 'Contact not found',
      });
    }
  
    try {
      const contact = await getContactsById(contactId);
      if (!contact) {
        logger.warn(`No contact found with ID: ${contactId}`);
        return res.status(404).json({
          message: 'Contact not found',
        });
      }
      logger.info(`Successfully found contact with ID: ${contactId}`);
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id:${contactId}!`,
        data: contact,
      });
    } catch (e) {
      logger.error('Error fetching contact:', e);
      res.status(400).json({
        message: 'Invalid contact ID',
      });
    }
  });
  

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not Found',
    });
  });

  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
};