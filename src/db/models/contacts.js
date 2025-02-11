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
      required: false,
      default: null,
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
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false, // Disable the version key (_v) on documents
  }
);

// Exporting the model so it can be used elsewhere
// ContactsCollection will store contact information with the schema defined above
export const ContactsCollection = model('contacts', contactSchema);
