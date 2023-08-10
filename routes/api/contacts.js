const ctrl = require('../../controllers/contacts');
const { validateBody } = require('../../middlewares');
const { addSchema, updateSchema } = require('../../schemas/contacts');

const express = require('express');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', validateBody(addSchema), ctrl.add);

router.put('/:id', validateBody(updateSchema), ctrl.update);

router.delete('/:id', ctrl.remove);

module.exports = router;
