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
      status.all = result;
      status.test = '<span class="TitleServiceChange" >Service Change</span><span class="DateStyle"> &nbsp;Posted:&nbsp;06/06/2017&nbsp;10:07PM </span><br/><br/> <P>Due to an investigation at <STRONG>Bay Pkwy</STRONG>, northbound [N] trains are running express from <STRONG>Kings Hwy</STRONG> to <STRONG>59 St</STRONG>(Bklyn) . </P> <P>Allow additional travel time.</P> <br/><br/>'
      return status;
    });
}