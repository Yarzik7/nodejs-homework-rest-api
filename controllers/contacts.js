const {
  getAllContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateByIdService,
} = require('../services/contactsServices');
const {
  ctrlWrapper,
  operationById,
  Errors: { HttpError },
} = require('../helpers');

const getAllContactsController = async (req, res) => {
  res.json(await getAllContactsService());
};

const getContactByIdController = async (req, res) => {
  await operationById(req, res, getContactByIdService);
};

const removeContactController = async (req, res) => {
  await operationById(req, res, removeContactService);
};

const addContactController = async (req, res) => {
  res.status(201).json(await addContactService(req.body));
};

const updateContactController = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw new HttpError(400, 'missing fields');
  }

  await operationById(req, res, updateByIdService);
};

module.exports = {
  getAllContactsController: ctrlWrapper(getAllContactsController),
  getContactByIdController: ctrlWrapper(getContactByIdController),
  removeContactController: ctrlWrapper(removeContactController),
  addContactController: ctrlWrapper(addContactController),
  updateContactController: ctrlWrapper(updateContactController),
};
