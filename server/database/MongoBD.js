require('dotenv').config();
const mongoose = require('mongoose');

const DB_NAME = process.env.DB_ATLAS_NAME;
const DB_PASSWORD = process.env.DB_ATLAS_PASSWORD;
const uri_db = `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.d8q7u1u.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri_db)
  .then(() => {
    console.log('La base de datos está conectada');
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:', error.message);
  });

