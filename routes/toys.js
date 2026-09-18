const express = require("express");
const { ToysModel, validToys } = require("../models/toysModel");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const skip = (req.query.skip || 0);
        const data = await ToysModel.find({})
            .limit(10)
            .skip(skip * 10)

        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
});

router.get("/search", async (req, res) => {
    const search = req.query.s;
    const skip = req.query.skip || 0;
    const findFilter = {};

    if (search) {
        const searchExp = new RegExp(search, "i");
        findFilter.$or = [
            {name:searchExp},
            {info:searchExp}
        ]
    }
    try {
        const data = await ToysModel
        .find(findFilter)
        .limit(10)
        .skip(skip * 10)

        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
});

router.get("/category/:category", async (req, res) => {
    try {
        const category = req.params.category;
        const skip = req.query.skip || 0;
        const data = await ToysModel.
        find({ category: category })
        .limit(10)
        .skip(skip * 10)

        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
});

router.get("/single/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ToysModel.findOne({_id: id });

        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
});

router.get("/count", async (req, res) => {
    try {
        const count = await ToysModel.countDocuments({});
        res.json({ count: count })
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
});

router.post("/", auth, async (req, res) => {
    const validBody = validToys(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }

    try {
        const toy = new ToysModel(req.body);
        toy.user_id = req.tokenData.id;
        await toy.save()
        res.json(toy)
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
});

router.put("/:id",auth, async (req, res) => {
    const validBody = validToys(req.body);
    if(validBody.error) {
        return res.status(400).json(validBody.error.details)
    }

    try {
        const id = req.params.id;

        const data = await ToysModel.updateOne({_id:id, user_id:req.tokenData.id}, req.body);
        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
});

router.delete("/:id",auth, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ToysModel.deleteOne({_id:id, user_id:req.tokenData.id});
        res.json(data)
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
});

module.exports = router