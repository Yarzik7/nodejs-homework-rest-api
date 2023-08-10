const { nanoid } = require('nanoid');

const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

/**
 * Reads and returns an array of contacts from a file
 * @returns array
 */
async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

/**
 * Finds a contact object by id and returns it
 * @param {string} contactId
 * @returns object
 */
async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find(({ id }) => id === String(contactId));
  return contactById ?? null;
}

/**
 * Deletes a contact by id and returns it
 * @param {string} contactId
 * @returns object
 */
async function removeContact(contactId) {
  const contacts = await listContacts();
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
async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
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
async function updateById(id, data) {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(({ id: contactId }) => contactId === String(id));
  if (contactIdx === -1) {
    return null;
  }
  const contactData = { ...contacts[contactIdx], ...data };
  contacts[contactIdx] = { ...contactData, id };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIdx];
}

module.exports = { listContacts, getContactById, removeContact, addContact, updateById };
