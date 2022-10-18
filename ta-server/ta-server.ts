import express = require('express');
import bodyParser = require("body-parser");
import { Service } from './service';

var taserver = express();

var service: Service = new Service();
service.addClient("Emanoel Rafael", "111.111.111-11", "(81) 98888-8888", "emanoelrafel2020@gmail.com","08/01/1999");
service.addClient("kellen mello", "222.222.222-22", "(91) 98787-8787", "KellenMello@gmail.com", "11/12/1996");
service.addClient("karol kimberly", "333.222.232-22", "(91) 98787-8787", "KellenMello@gmail.com", "11/12/1996");

service.addProduct("Echo Dot 4Gen",379.05,"Smart Speaker com Alexa - Cor Preta","exampleProduct.jpg");
service.addProduct("Projetor Blulory",659.00,"Com 4K 1200 Lux e UHD Nativo 1280*720p, LCD Video Beamer Compatível com Android OS/Tablet/PC","exampleProduct.jpg");
service.addProduct("Galaxy Tab S7 FE",3719.00,'TABLET SAMSUNG T735 com 4G e memoria RAM, 12.4", 128GB de memoria interna. Cor: PRETO MAN',"exampleProduct.jpg");
service.addProduct("Smart TV Samsung",5299.00,"Smart TV Samsung 50 polegadas UHD 4K 2021","exampleProduct.jpg");

service.addProductClient(0,0,1);
service.addProductClient(0,1,2);
service.addProductClient(0,2,1);

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