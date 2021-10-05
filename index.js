const controlContacts = require("./contacts.js");
const argv = require("yargs").argv;

console.log(process.argv);

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      controlContacts.listContacts();
      break;

    case "get":
      controlContacts.getContactById(id);
      break;

    case "add":
      controlContacts.addContact(name, email, phone);
      break;

    case "remove":
      controlContacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
