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
  }
);
export const ContactsCollection = model('contacts', contactSchema);

// ------------------------------

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const UsersCollection = model('users', usersSchema);
