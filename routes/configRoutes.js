const toysR = require("./toys");
const userR = require("./users");
const indexR = require("./index")


exports.configRoutes = (app) => {
    app.use("/toys", toysR);
    app.use("/users",userR);
    app.use("/", indexR)
}