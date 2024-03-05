const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const path = require('path'); // Agrega esta línea para manejar rutas de archivos estáticos
const cors = require('cors');
const http = require('http')
const { Server: Socketsever } = require('socket.io')
const createServer = require('node:http')


require("./database/MongoBD.js");

const app = express();

app.name = "API";

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.json());

// creemos el servidor con el modulo http
const server = http.createServer(app)
const io = new Socketsever(server, {
  cors: {
    origin: '*'
  }
})

// Configuración del middleware para servir archivos estáticos (necesario para el enrutamiento del lado del cliente)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use(cors());



io.on('connection', (socket) => {
  // console.log(socket.id);
  console.log(`Usuario actual: ${socket.id}`)

  socket.on("join_room",(data)=>{
    socket.join(data)
    console.log(`Usuario con id: ${socket.id} se unió a la sala: ${data}`)
  }
  )
  socket.on("send_message",(data)=>{
    socket.to(data.room).emit("receive_message", data)
    // console.log("Mensaje recibido");
    // console.log(data);
  })

  socket.on("disconnect", ()=>{
    console.log("usuario desconectado", socket.id);
  })

  // socket.on('message', (message, nickname) => {
  //   //Envio al resto clients
  //   socket.broadcast.emit('message', {
  //     body: message,
  //     from: nickname
  //   })
  // })
})


// Error catching endware.
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
