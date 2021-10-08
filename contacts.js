const fs = require("fs").promises;
const path = require("path");

const shortid = require("shortid");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.table(normalizeData(data));
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const filterName = normalizeData(data).filter(({ id }) => id === contactId);
    console.table(filterName);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const newContacts = normalizeData(data).filter(
      ({ id }) => id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(`контакт под id=${contactId} успешно удален.`);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: shortid.generate(), name, email, phone };
  try {
    const data = await fs.readFile(contactsPath);
    const processedData = normalizeData(data);
    const updateContacts = JSON.stringify([...processedData, newContact]);
    await fs.writeFile(contactsPath, updateContacts);
    console.log(`контакт под именем '${name}' успешно создан.`);
  } catch (error) {
    console.log(error);
  }
}

function normalizeData(data) {
  const convertTextData = data.toString();
  return JSON.parse(convertTextData);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
