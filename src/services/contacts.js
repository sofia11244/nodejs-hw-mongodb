
// src/services/contacts.js

import { ContactsCollection } from '../db/models/contacts.js'; // Import the contacts model

// Function to get all contacts
export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
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
  const student = await ContactsCollection.create(payload);
  return student;
};