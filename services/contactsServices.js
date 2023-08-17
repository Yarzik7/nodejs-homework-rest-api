const { operationById } = require('../helpers');

const { Contact } = require('../models/contacts');
const { findById, findByIdAndRemove, findByIdAndUpdate } = Contact;

/**
 * Gets contacts array from the database and returns it
 * @returns array
 */
async function getAllContactsService(req) {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...fields } = req.query;
  
  const skip = (page - 1) * limit;
  return await Contact.find({ ...fields, owner }, "",{ skip, limit });
}

/**
 * Gets a contact object by id from the database and returns it
 * @param {object} req
 * @returns object
 */
async function getContactByIdService(req) {
  return await operationById(req, findById.bind(Contact));
}

/**
 * Deletes a contact by id from the database and returns it
 * @param {object} req
 * @returns object
 */
async function removeContactService(req) {
  return await operationById(req, findByIdAndRemove.bind(Contact));
}

/**
 * Adds a contact to the database and returns it
 * @param {object} req
 * @returns object
 */
async function addContactService(req) {
  const { _id: owner } = req.user;
  return Contact.create({ ...req.body, owner });
}

/**
 * Updates contact information returns a contact object with updated information
 * @param {object} req
 * @returns object
 */
async function updateByIdService(req) {
  return await operationById(req, await findByIdAndUpdate.bind(Contact), req.body, { new: true });
}

module.exports = {
  getAllContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateByIdService,
};
