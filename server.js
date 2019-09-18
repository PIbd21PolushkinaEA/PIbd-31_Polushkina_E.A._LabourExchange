const path = require('path');
const express = require('express');
const app = express();

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

app.use(forceSSL());

app.use(express.static('PIbd-31_Polushkina_E.A._LabourExchange/dist'));
app.listen(process.env.PORT || 8080);

app.get('/*', function(req, res) {
  res.sendFile(path.join('PIbd-31_Polushkina_E.A._LabourExchange/dist/LabourExchange/index.html'));
});