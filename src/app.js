const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const contactRoutes = require('./routes/contactRoutes');

const app = express(); 
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, '../public/index.html')); });
app.use('/api/contacts', contactRoutes); app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
