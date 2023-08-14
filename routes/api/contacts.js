const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contacts');

const express = require('express');

const router = express.Router();

router.get('/', ctrl.getAllContactsController);

router.get('/:id', isValidId, ctrl.getContactByIdController);

router.post('/', validateBody(schemas.addSchema), ctrl.addContactController);

router.put('/:id', isValidId, validateBody(schemas.updateSchema), ctrl.updateContactController);

router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavoriteContactController);

router.delete('/:id', isValidId, ctrl.removeContactController);

module.exports = router;
