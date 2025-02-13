
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
    getAllContactsController,
getContactsByIdController,
createContactController,
} from '../controllers/contacts.js';


const router = Router();

// Çünkü server.js içinde zaten /contacts yolunu verdin bu yüzden conatcs eklemene gerek yok.

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', ctrlWrapper(getContactsByIdController));

router.post('/:contactId', ctrlWrapper(createContactController));


export default router;


