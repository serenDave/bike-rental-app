const express = require('express');
const bikesRouter = require('./bikes');
const router = express.Router();

router.use('/bikes', bikesRouter);

module.exports = router;
