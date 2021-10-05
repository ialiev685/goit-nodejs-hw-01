const fs = require("fs");
const path = require("path");

const shortid = require("shortid");
const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    console.table(normalizeData(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    const filterName = normalizeData(data).filter(({ id }) => id === contactId);
    console.table(filterName);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    const newContacts = normalizeData(data).filter(
      ({ id }) => id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) {
        console.log("ошибка удаления контакта.");
        return;
      }
      console.log(`контакт под id=${contactId} успешно удален.`);
    });
  });
}

function addContact(name, email, phone) {
  const newContact = { id: shortid.generate(), name, email, phone };
  fs.readFile(contactsPath, (err, data) => {
    const processedData = normalizeData(data);
    const updateContacts = JSON.stringify([...processedData, newContact]);
    fs.writeFile(contactsPath, updateContacts, (err) => {
      if (err) {
        console.log("ошибка в создании контакта.");
        return;
      }
      console.log(`контакт под именем '${name}' успешно создан.`);
    });
  });
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
