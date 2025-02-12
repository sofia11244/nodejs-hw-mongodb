
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
    getAllContactsController,
getContactsByIdController,
} from '../controllers/contacts.js';


const router = Router();

// Çünkü server.js içinde zaten /contacts yolunu verdin bu yüzden conatcs eklemene gerek yok.

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', ctrlWrapper(getContactsByIdController));
export default router;


