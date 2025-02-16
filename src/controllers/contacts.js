
import { getAllContacts, getContactsById } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';



export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
    
      const contacts = await getAllContacts(
        {
          page,
          perPage,
          sortBy,
          sortOrder,
        }
      );

      const { sortBy, sortOrder } = parseSortParams(req.query);
      
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
  };


  export const getContactsByIdController = async (
    req,
    res,
  ) => {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId);
  
  // GET /contacts/:contactId - Belirli ID'ye sahip kişiyi getir
      if (!contact) {
        throw createHttpError(404, 'Contact not found');
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
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};


import { deleteContact } from "../services/contacts.js";

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'contact not found'));
    return;
  }

  res.status(204).send();
};

import { updateContact } from "../services/contacts.js";


export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};