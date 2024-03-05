require('dotenv').config();
const server = require('./app');
require(`./database/MongoBD`)
const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`listening at ${PORT}`); 
  });

