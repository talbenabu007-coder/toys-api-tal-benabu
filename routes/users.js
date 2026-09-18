const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel, validUser, validLogin, createToken } = require("../models/userModel");
const router = express.Router();

router.post("/", async (req, res) => {

    const validBody = validUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        const user = new UserModel(req.body);
        user.password = await bcrypt.hash(user.password, 10)
        await user.save();

        user.password = "****"
        res.json(user);
    }
    catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({ err: "Email already in the system.", code: 11000 })
        }
        console.log(err);
        res.status(502).json({ err })
    }
});

router.post("/login", async (req, res) => {
    const validBody = validLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
           return res.status(401).json({ err: "Email not found." })
        }

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(401).json({ err: "Password is incorrect." })
        }

        const newToken = createToken(user.id, user.role);
        res.json({ token: newToken })
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
});


module.exports = router
