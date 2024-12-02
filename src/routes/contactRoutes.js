const express = require('express');
const { getContacts, createContact, filterContacts, deleteContact, updateContact } = require('../controllers/contactController');

const router = express.Router();

router.get('/', getContacts);
router.post('/', createContact);
router.get('/filter/:query', filterContacts);
router.delete('/:id', deleteContact);
router.put('/:id', updateContact);

module.exports = router;
