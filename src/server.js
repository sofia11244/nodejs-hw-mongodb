import express from 'express';
import cors from 'cors';
import pino from 'pino';
// import { env } from './utils/env.js';
// import mongoose from 'mongoose';
import { getAllContacts, getContactsById } from './services/contacts.js';

const PORT = process.env.PORT || 4000; // Use the port provided by the hosting platform

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

  // Correct usage of getContactsById as a route handler
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params; // Get contactId from URL
    try {
      const contact = await getContactsById(contactId); // Call the function with contactId
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id: ${contactId}`,
        data: contact,
      });
    } catch (error) {
      console.error('Error fetching contact:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not Found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port "${PORT}"`);
  });
};
