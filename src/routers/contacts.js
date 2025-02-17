
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';
import { updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
// import { checkRoles } from '../middlewares/checkRoles.js';
// import { ROLES } from '../constants/index.js';


import {
    getAllContactsController,
getContactsByIdController,
createContactController,
deleteContactController,
upsertContactController,
patchContactController
} from '../controllers/contacts.js';


const router = Router();

// Çünkü server.js içinde zaten /contacts yolunu verdin bu yüzden conatcs eklemene gerek yok.

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.put('/:contactId', ctrlWrapper(upsertContactController));

router.patch('/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));

router.post(
    '/register',
    validateBody(createContactSchema),
    ctrlWrapper(createContactController),
  );

  router.use(authenticate);

router.get('/', ctrlWrapper(getContactsByIdController));



export default router;


