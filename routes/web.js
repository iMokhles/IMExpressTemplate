var express = require('express');
var router = express.Router();
var homeController = require('../app/http/controllers/web/HomeController');

router.get('/', homeController.getIndexPage);
router.get('/home', homeController.getHomePage);

module.exports = router;
