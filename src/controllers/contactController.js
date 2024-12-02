const Contact = require('../models/contact');

let contacts = [];

const getContacts = (req, res) => {
  res.json(contacts);
};

const createContact = (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = new Contact(Date.now().toString(), name, email, phone);
  contacts.push(newContact);
  res.status(201).json(newContact);
};

const filterContacts = (req, res) => {
  const { query } = req.params;
  const filteredContacts = contacts.filter(contact =>
    contact.name.includes(query) ||
    contact.email.includes(query) ||
    contact.phone.includes(query)
  );
  res.json(filteredContacts);
};

module.exports = { getContacts, createContact, filterContacts };
