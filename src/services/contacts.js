// src/services/contacts.js

import { ContactsCollection } from '../db/models/contacts.js'; // İletişim modelini import et
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

// Tüm iletişimleri almak için fonksiyon
export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  

  // Başlangıçta tüm iletişimleri alıyoruz
  const contactsQuery = ContactsCollection.find();

  // Filtreleme işlemleri

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  // Filtrelenmiş iletişimlerin sayısını alıyoruz
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .collation({ locale: 'tr', strength: 1 })
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

// ID'ye göre bir iletişimi almak için fonksiyon
export const getContactsById = async (contactId) => {
  try {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

// Yeni iletişim oluşturma fonksiyonu
export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

// İletişimi silme fonksiyonu
export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    
  });

  return contact;
};

// İletişimi güncelleme fonksiyonu
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
