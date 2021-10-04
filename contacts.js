const fs = require("fs");
const path = require("path");

const shortid = require("shortid");
const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  // ...твой код
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    console.log(data);
  });
}

function getContactById(contactId = 9) {
  // ...твой код
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    const normalizeData = JSON.parse(data);
    const filterName = normalizeData.filter(({ id }) => id === contactId);
    console.log(filterName);
  });
}

function removeContact(contactId = 3) {
  // ...твой код
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    const normalizeData = JSON.parse(data);
    const newContacts = normalizeData.filter(({ id }) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) {
        console.log("ошибка удаления контакта");
      } else {
        console.log("контакт успешно удален");
      }
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
        console.log("ошибка создания контакта");
      } else {
        console.log("контакт успешно создан");
      }
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
