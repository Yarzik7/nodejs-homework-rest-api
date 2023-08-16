const {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  updateFavoriteContactController,
  removeContactController,
} = require('../../controllers/contacts');

const { validateBody, isValidId, authenticate } = require('../../middlewares');
const {addSchema, updateSchema, updateFavoriteSchema } = require('../../utils/validation/contactValidationSchemas');

const express = require('express');

const router = express.Router();

router.get('/', authenticate, getAllContactsController);

router.get('/:id', authenticate, isValidId, getContactByIdController);

router.post('/', authenticate,validateBody(addSchema), addContactController);

router.put('/:id', authenticate,isValidId, validateBody(updateSchema), updateContactController);

router.patch('/:id/favorite', authenticate,isValidId, validateBody(updateFavoriteSchema), updateFavoriteContactController);

router.delete('/:id', authenticate,isValidId, removeContactController);

module.exports = router;
