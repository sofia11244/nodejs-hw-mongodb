
import { getAllContacts, getContactsById } from '../services/contacts.js';
import createHttpError from 'http-errors';


export const getAllContactsController = async (req, res,next) => {
    try {
      const contacts = await getAllContacts();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (err) {
      next(err);
    }
  };


  export const getContactsByIdController = async (
    req,
    res,
  ) => {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId);
  
  // GET /contacts/:contactId - Belirli ID'ye sahip kişiyi getir
      if (!contact) {
        throw createHttpError(404, 'Student not found');
      }
  
      // Öğrenci bulunursa cevap
    res.json({
      status: 200,
      message: `Successfully found contact with id: ${contactId}`,
      data: contact,
    });
  };
  

  import { createContact } from '../services/contacts.js';

export const createContactController = async (req, res) => {
  const student = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: student,
  });
};
