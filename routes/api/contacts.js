const {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  updateFavoriteContactController,
  removeContactController,
} = require('../../controllers/contacts');

const { validateBody, isValidId } = require('../../middlewares');
const {addSchema, updateSchema, updateFavoriteSchema } = require('../../utils/validation/contactValidationSchemas');

const express = require('express');

const router = express.Router();

router.get('/', getAllContactsController);

router.get('/:id', isValidId, getContactByIdController);

router.post('/', validateBody(addSchema), addContactController);

router.put('/:id', isValidId, validateBody(updateSchema), updateContactController);

router.patch('/:id/favorite', isValidId, validateBody(updateFavoriteSchema), updateFavoriteContactController);

router.delete('/:id', isValidId, removeContactController);

module.exports = router;
