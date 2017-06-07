var _ = require('lodash');
var mta = require('mta-gtfs');
var Mta = new mta();

module.exports =
  {
    lorm: lorm,
    getTrains: getTrainInfo
  };

function lorm(req, res, next) {
  getTrains()
    .then(function (trains) {
      if (isGoodService(trains.m)) {
        res.lorm = 'm';
      }
      else if (isGoodService(trains.l)) {
        res.lorm = 'l';
      }
      next();
    })
    .catch(function (err) {
      console.log('error', err);
    });

}

function getTrainInfo(req, res, next) {
  getTrains()
    .then(function(trains) {
      res.trains = trains;
      next();
    })
}


///////////////////
//    Helpers   //
///////////////////

function isGoodService(line) {
  return line.status === 'GOOD SERVICE';
}

function getTrains() {
  var status = {};
  return Mta.status('subway')
    .then(function (result) {
      status.l = _.find(result, {name: 'L'});
      status.m = _.find(result, {name: 'BDFM'});
      return status;
    });
}