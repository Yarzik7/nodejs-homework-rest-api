const { ctrlWrapper } = require('../helpers');

const {
  getAllContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateByIdService,
} = require('../services/contactsServices');

const getAllContactsController = async (req, res) => {
  res.json(await getAllContactsService(req));
};

const getContactByIdController = async (req, res) => {
  res.json(await getContactByIdService(req));
};

const removeContactController = async (req, res) => {
  res.json(await removeContactService(req));
};

const addContactController = async (req, res) => {
  res.status(201).json(await addContactService(req));
};

const updateContactController = async (req, res) => {
  res.json(await updateByIdService(req));
};

const updateFavoriteContactController = async (req, res) => {
  res.json(await updateByIdService(req));
};

module.exports = {
  getAllContactsController: ctrlWrapper(getAllContactsController),
  getContactByIdController: ctrlWrapper(getContactByIdController),
  removeContactController: ctrlWrapper(removeContactController),
  addContactController: ctrlWrapper(addContactController),
  updateContactController: ctrlWrapper(updateContactController),
  updateFavoriteContactController: ctrlWrapper(updateFavoriteContactController),
};
