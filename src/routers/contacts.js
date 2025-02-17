import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';
import { updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';  // Import checkRoles
import { ROLES } from '../constants/index.js';  // Import ROLES

import {
  getAllContactsController,
  getContactsByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController
} from '../controllers/contacts.js';

const router = Router();


// Get all contacts (accessible by USER role)
router.get('/', authenticate, checkRoles(ROLES.USER), ctrlWrapper(getAllContactsController));

// Get contact by ID (accessible by USER role)
router.get('/:contactId', authenticate, checkRoles(ROLES.USER), isValidId, ctrlWrapper(getContactsByIdController));

// Create a new contact (accessible by USER role)
router.post('/', authenticate, checkRoles(ROLES.USER), validateBody(createContactSchema), ctrlWrapper(createContactController));

// Delete a contact (accessible by USER role)
router.delete('/:contactId', authenticate, checkRoles(ROLES.USER), ctrlWrapper(deleteContactController));

// Upsert a contact (accessible by USER role)
router.put('/:contactId', authenticate, checkRoles(ROLES.USER), validateBody(createContactSchema), ctrlWrapper(upsertContactController));

// Update a contact (accessible by USER role)
router.patch('/:contactId', authenticate, checkRoles(ROLES.USER), validateBody(updateContactSchema), ctrlWrapper(patchContactController));

// Register a new contact (accessible by USER role)
router.post(
  '/register',
  authenticate,
  checkRoles(ROLES.USER),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

export default router;
