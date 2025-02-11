import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { getAllContacts, getContactsById } from './services/contacts.js';

const PORT = process.env.PORT || 5000;

const logger = pino({
  level: 'info',
});

export const SetupServer = async () => {
  // Call initMongoDB to establish the MongoDB connection before starting the server

  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    logger.info('GET request received on /');
    res.json({
      message: 'Hi there!',
    });
  });

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      logger.error('Error fetching contacts', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    try {
      const contact = await getContactsById(contactId);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id: ${contactId}`,
        data: contact,
      });
    } catch (error) {
      logger.error('Error fetching contact', error);
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
