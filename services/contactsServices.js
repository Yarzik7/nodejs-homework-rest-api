const { nanoid } = require('nanoid');

const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, '../models/contacts.json');

/**
 * Reads and returns an array of contacts from a file
 * @returns array
 */
async function getAllContactsService() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

/**
 * Finds a contact object by id and returns it
 * @param {string} contactId
 * @returns object
 */
async function getContactByIdService(contactId) {
  const contacts = await getAllContactsService();
  const contactById = contacts.find(({ id }) => id === String(contactId));
  return contactById ?? null;
}

/**
 * Deletes a contact by id and returns it
 * @param {string} contactId
 * @returns object
 */
async function removeContactService(contactId) {
  const contacts = await getAllContactsService();
  const contactIdx = contacts.findIndex(({ id }) => id === String(contactId));
  if (contactIdx === -1) {
    return null;
  }
  const [contact] = contacts.splice(contactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return { message: 'contact deleted', contact };
}

/**
 * Creates and adds a contact to an array and returns it
 * @param {object} contact parameters object
 * @returns object
 */
async function addContactService({ name, email, phone }) {
  const contacts = await getAllContactsService();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

/**
 * Updates contact information returns a contact object with updated information
 * @param {string} contactId
 * @param {object} data
 * @returns object
 */
async function updateByIdService(id, data) {
  const contacts = await getAllContactsService();
  const contactIdx = contacts.findIndex(({ id: contactId }) => contactId === String(id));
  if (contactIdx === -1) {
    return null;
  }
  const contactData = { ...contacts[contactIdx], ...data };
  contacts[contactIdx] = { ...contactData, id };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIdx];
}

module.exports = {
  getAllContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateByIdService,
};
