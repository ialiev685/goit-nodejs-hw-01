const controlContacts = require("./contacts.js");
// const argv = require("yargs").argv;

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      controlContacts.listContacts();
      break;

    case "get":
      controlContacts.getContactById(processingId(id));
      break;

    case "add":
      controlContacts.addContact(name, email, phone);
      break;

    case "remove":
      controlContacts.removeContact(processingId(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

function processingId(id) {
  if (Number(id)) return Number(id);
  return id;
}

invokeAction(argv);
