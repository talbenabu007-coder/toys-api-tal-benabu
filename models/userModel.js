const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");


const schema = new mongoose.Schema({
    name:String,
    email:{type: String, unique: true},
    password:String,
    role:{type: String, default: "user"}
},
{timestamps:true});

exports.UserModel = mongoose.model("user",schema);


exports.createToken = (user_id, role) => {
  const token = jwt.sign({id:user_id , role},process.env.TOKEN_SECRET,{expiresIn:"60mins"})
  return token
}

exports.validUser = (reqBody) => {
    const joiSchema = Joi.object({
        name:Joi.string().min(3).max(100).required(),
        email:Joi.string().min(3).max(100).email().required(),
        password:Joi.string().min(3).max(100).required(),
    })
    return joiSchema.validate(reqBody)
}

exports.validLogin = (_reqBody) => {
  const joiSchema = Joi.object({
    email:Joi.string().min(3).max(100).email().required(),
    password:Joi.string().min(3).max(100).required(),
  })
  return joiSchema.validate(_reqBody)
}