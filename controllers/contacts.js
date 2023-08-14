const {
  ctrlWrapper,
  operationById,
  Errors: { HttpError },
} = require('../helpers');

const { Contact } = require('../models/contacts');
const { findById, findByIdAndRemove, findByIdAndUpdate } = Contact;

const getAllContactsController = async (req, res) => {
  res.json(await Contact.find());
};

const getContactByIdController = async (req, res) => {
  await operationById(req, res, findById.bind(Contact));
};

const removeContactController = async (req, res) => {
  await operationById(req, res, findByIdAndRemove.bind(Contact));
};

const addContactController = async (req, res) => {
  res.status(201).json(await Contact.create(req.body));
};

const updateContactController = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw new HttpError(422, 'missing fields');
  }

  await operationById(req, res, findByIdAndUpdate.bind(Contact), req.body, { new: true });
};

const updateFavoriteContactController = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw new HttpError(422, 'missing field favorite');
  }

  await operationById(req, res, findByIdAndUpdate.bind(Contact), req.body, { new: true });
};

module.exports = {
  getAllContactsController: ctrlWrapper(getAllContactsController),
  getContactByIdController: ctrlWrapper(getContactByIdController),
  removeContactController: ctrlWrapper(removeContactController),
  addContactController: ctrlWrapper(addContactController),
  updateContactController: ctrlWrapper(updateContactController),
  updateFavoriteContactController: ctrlWrapper(updateFavoriteContactController),
};
