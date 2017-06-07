var express = require('express');
var router = express.Router();

var MtaService = require('../services/mta-service.js');
var UtilService = require('../services/util-service.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/lorm/', [MtaService.lorm, MtaService.getTrains], function(req, res, next) {
  res.render('lorm', {lorm: res.lorm, trains: res.trains});
});

router.get('/api/lorm/', [
  MtaService.lorm,
  UtilService.sendLorm
]);

router.get('/api/trains/', [
  MtaService.getTrains,
  UtilService.sendTrains
]);

module.exports = router;
