const express = require('express');
const { getContacts, createContact, filterContacts } = require('../controllers/contactController');

const router = express.Router();

router.get('/', getContacts);
router.post('/', createContact);
router.get('/filter/:query', filterContacts);

module.exports = router;
