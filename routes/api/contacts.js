const ctrl = require('../../controllers/contacts');
const { validateBody } = require('../../middlewares');
const { addSchema, updateSchema } = require('../../schemas/contacts');

const express = require('express');

const router = express.Router();

router.get('/', ctrl.getAllContactsController);

router.get('/:id', ctrl.getContactByIdController);

router.post('/', validateBody(addSchema), ctrl.addContactController);

router.put('/:id', validateBody(updateSchema), ctrl.updateContactController);

router.delete('/:id', ctrl.removeContactController);

module.exports = router;
