const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({msg:"Toys Api works"})
});

module.exports = router;