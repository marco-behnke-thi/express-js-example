var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index_controller');

/* GET home page. */
router.get('/', indexController.getIndex);

module.exports = router;
