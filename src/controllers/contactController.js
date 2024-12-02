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

const deleteContact = (req, res) => {
  const { id } = req.params;
  contacts = contacts.filter(contact => contact.id !== id);
  res.status(204).send();
};

const updateContact = (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const contactIndex = contacts.findIndex(contact => contact.id === id);
  if (contactIndex !== -1) {
    contacts[contactIndex] = { id, name, email, phone };
    res.json(contacts[contactIndex]);
  } else {
    res.status(404).send('Contact not found');
  }
};

module.exports = { getContacts, createContact, filterContacts, deleteContact, updateContact };
