var express = require('express');
var app = express();
var cors = require('cors');

var Tado = require('node-tado').default;

var config = require("./config")

var client = new Tado();

var port = process.env.PORT || 3001

var roomTemperature = function (req, res) {
  client.state(config.HOME_ID, "1").then(function(result) {
    res.send(Math.round(result.sensorDataPoints.insideTemperature.celsius).toString())
  }).catch(function(err){
    console.log(err)
  })
}

app.use(cors())
app.get("/roomTemperature", roomTemperature);

client.login(config.USERNAME, config.PASSWORD).then(function(success) {
  console.log("Tado service is up and running!")
  return app.listen(port)
}).then(function(success) {
  console.log('Room temperature API available at port ' + port)
}).catch(function(err) {
  console.log(err)
})
