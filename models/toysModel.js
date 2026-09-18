const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
    name:String,
    info:String,
    category:String,
    img_url:String,
    price:Number,
    user_id:String
},{timestamps:true});

exports.ToysModel = mongoose.model("toys",schema);

exports.validToys = (reqBody) => {
    const joiSchema = Joi.object({
        name:Joi.string().min(3).max(100).required(),
        info:Joi.string().min(3).max(400).required(),
        category:Joi.string().min(3).max(100).required(),
        img_url:Joi.string().min(3).max(400).allow(null, ""),
        price:Joi.number().min(1).max(1000).required()
    });
    return joiSchema.validate(reqBody)
}