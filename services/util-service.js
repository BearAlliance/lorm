module.exports = {
  sendLorm: sendLorm,
  sendTrains: sendTrains
};

function sendLorm(req, res, next) {
  res.json(res.lorm);
}

function sendTrains(req, res, next) {
  res.json(res.trains);
}