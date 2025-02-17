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
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false,
  }
);
export const ContactsCollection = model('contacts', contactSchema);

// ------------------------------

import { ROLES } from '../../constants/index.js';


const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [ROLES.USER],
      default: ROLES.USER,
    },
  },
  { timestamps: true, versionKey: false },
);

export const UsersCollection = model('users', usersSchema);
