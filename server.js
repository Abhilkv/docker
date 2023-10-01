const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://admin:secret@mongo:27017/user-account', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin', // Specify the authentication source
});

// Create a Person schema
const personSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
});

const Person = mongoose.model('Person', personSchema);

// Middleware to parse JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/form', async (req, res) => {
  const { name, address, phone } = req.body;

  try {
    const newPerson = new Person({ name, address, phone });
    await newPerson.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving data to the database' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
