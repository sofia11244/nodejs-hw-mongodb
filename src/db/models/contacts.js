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
    photo: { type: String, default: null },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false,
  }
);
export const ContactsCollection = model('contacts', contactSchema);

// ------------------------------
