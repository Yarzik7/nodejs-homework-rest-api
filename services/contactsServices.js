const {operationById} = require('../helpers');

const { Contact } = require('../models/contacts');
const { findById, findByIdAndRemove, findByIdAndUpdate } = Contact;


/**
 * Gets contacts array from the database and returns it
 * @returns array
 */
async function getAllContactsService() {
  return await Contact.find();
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
 * @param {object} body of request
 * @returns object
 */
async function addContactService(body) {
  return Contact.create(body);
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
