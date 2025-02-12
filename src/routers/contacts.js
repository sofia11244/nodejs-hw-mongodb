
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
    getAllContactsController,
getContactsByIdController,
} from '../controllers/contacts.js';


const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));
export default router;


