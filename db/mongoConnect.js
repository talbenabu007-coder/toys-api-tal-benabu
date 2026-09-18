const mongoose = require('mongoose');
require("dotenv").config({quiet:true})
const connect = async () => {
    await mongoose.connect(process.env.MONGO_DB)
    console.log("mongo connect Toys")
};

module.exports = connect;

