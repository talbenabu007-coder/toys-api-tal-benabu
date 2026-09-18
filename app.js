const express = require("express");
const http = require("http");
const { configRoutes } = require("./routes/configRoutes");
const connect = require("./db/mongoConnect")

const app = express();
app.use(express.json())
configRoutes(app)
connect()

const server = http.createServer(app);
server.listen(3001);
console.log("http://localhost:3001");


