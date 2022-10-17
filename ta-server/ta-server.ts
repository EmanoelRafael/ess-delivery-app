import express = require('express');
import bodyParser = require("body-parser");
import { Service } from './service';

var taserver = express();

var service: Service = new Service();
service.addClient("Emanoel Rafael", "111.111.111-11", "(81) 98888-8888", "emanoelrafel2020@gmail.com","08/01/1999");
service.addClient("kellen mello", "222.222.222-22", "(91) 98787-8787", "KellenMello@gmail.com", "11/12/1996");

var allowCrossDomain = function(req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

taserver.get('/', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify("Fast&Ship"));
})

taserver.get('/cart', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(service.getClient(0).getCart()));
})

taserver.get('/email', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(service.getClient(0).getEmail()));
})

taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!!!');
})