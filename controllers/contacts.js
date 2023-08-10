const { listContacts, getContactById, removeContact, addContact, updateById } = require('../contacts');
const { ctrlWrapper } = require('../helpers');
const { operationById } = require('../helpers');

const getAll = async (req, res) => {
  res.json(await listContacts());
};

const getById = async (req, res) => {
  await operationById(req, res, getContactById);
};

const remove = async (req, res) => {
  await operationById(req, res, removeContact);
};

const add = async (req, res) => {
  res.status(201).json(await addContact(req.body));
};

const update = async (req, res) => {
  await operationById(req, res, updateById);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  remove: ctrlWrapper(remove),
  add: ctrlWrapper(add),
  update: ctrlWrapper(update),
};
