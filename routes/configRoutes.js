const toysR = require("./toys");
const userR = require("./users");


exports.configRoutes = (app) => {
    app.use("/toys", toysR);
    app.use("/users",userR);
}