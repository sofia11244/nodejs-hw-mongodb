// src/db/models/contact.js

import { Schema, model } from 'mongoose';

// Define the contact schema
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      required: true,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['personal', 'home', 'work'],
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    photo: { type: String },
    // photo: { type: String, default: null },

  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false,
  }
);
export const ContactsCollection = model('contacts', contactSchema);

// ------------------------------
// src/services/contacts.js

// import { ContactsCollection } from '../db/models/contacts.js'; // İletişim modelini import et
// import { calculatePaginationData } from '../utils/calculatePaginationData.js';
// import { SORT_ORDER } from '../constants/index.js';

// // Tüm iletişimleri almak için fonksiyon
// export const getAllContacts = async ({
//   filterOptions = {},
//   page = 1,
//   perPage = 10,
//   sortOrder = SORT_ORDER.ASC,
//   sortBy = '_id',
// }) => {
//   console.log("FilterOptions:", filterOptions);

//   const limit = perPage;
//   const skip = (page - 1) * perPage;

//   const contactsQuery = ContactsCollection.find();

//   if (filterOptions.contactType) {
//     contactsQuery.where('contactType').equals(filterOptions.contactType);
//   }
//   if (filterOptions.isFavourite !== undefined) {
//     contactsQuery.where('isFavourite').equals(filterOptions.isFavourite);
//   }

//   // Filtrelenmiş iletişimlerin sayısını alıyoruz
//   const contactsCount = await ContactsCollection.find()
//     .merge(contactsQuery)
//     .countDocuments();

//   const contacts = await contactsQuery
//     .skip(skip)
//     .limit(limit)
//     .collation({ locale: 'tr', strength: 1 })
//     .sort({ [sortBy]: sortOrder })
//     .exec();
//   const paginationData = calculatePaginationData(contactsCount, perPage, page);
//   return {
//     data: contacts,
//     ...paginationData,
//   };
// };