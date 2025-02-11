import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
import { getAllContacts, getContactsById } from './services/contacts.js';
import mongoose from 'mongoose';  // Import mongoose to use ObjectId validation

dotenv.config(); // This will read .env file

export const startServer = () => {
  const app = express();
  
  // Set up cors
  app.use(cors());
  app.use(express.json());

  // Define routes
  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts(); // Fetch contacts
    console.log('Retrieved Contacts:', contacts); // Log contacts
    res.status(200).json({
      data: contacts, // Send contacts data as response
    });
  });

  app.get('/contacts/:contactsid', async (req, res) => {
    const { contactsid } = req.params;

    // Check if the contactsid is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(contactsid)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const contacts = await getContactsById(contactsid);

    if (!contacts) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ data: contacts });
  });

  // Handle 404 for unknown routes
  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found'
    });
  });

  // Get port from environment variable or default to 3000
  const port = process.env.PORT || 3000;

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
