
// src/services/contacts.js

import { ContactsCollection } from '../db/models/contacts.js'; // Import the contacts model
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';



// Function to get all contacts
export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
})  => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
  .skip(skip)
  .limit(limit)
  .sort({ [sortBy]: sortOrder })
  .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

// Function to get a contact by ID
export const getContactsById = async (contactId) => {
  try{
    const contact = await ContactsCollection.findById(contactId);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
