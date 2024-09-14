const express = require('express');
const { read, create, remove} = require("../controllers/RegisterController");
const router = express.Router();

router.get("/", read)
router.post("/", create)
router.delete("/", remove)

module.exports = router;