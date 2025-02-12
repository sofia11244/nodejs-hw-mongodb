import express from 'express';
import { getAllContacts, getContactsById } from '../services/contacts.js';
import pino from 'pino';

const logger = pino({ level: 'info' });
const router = express.Router();

// GET /contacts - Tüm kişileri getir
router.get('/', async (req, res) => {
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

// GET /contacts/:contactId - Belirli ID'ye sahip kişiyi getir
router.get('/:contactId', async (req, res) => {
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

export default router;
