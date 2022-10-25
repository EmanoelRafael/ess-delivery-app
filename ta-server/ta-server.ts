import express = require('express');
import bodyParser = require("body-parser");
import { Service } from './service';
import { Order } from '../common/order';

var taserver = express();

var service: Service = new Service();

service.addClient("Emanoel Rafael", "111.111.111-11", "(81) 98888-8888", "emanoelrafael2020@gmail.com", "08/01/1999");
service.addClient("kellen mello", "222.222.222-22", "(91) 98787-8787", "KellenMello@gmail.com", "11/12/1996");
service.addClient("karol kimberly", "333.222.232-22", "(91) 98787-8787", "KellenMello@gmail.com", "11/12/1996");


service.addProduct("Echo Dot 4Gen", 379.05, "Smart Speaker com Alexa - Cor Preta", "Echo Dot.jpg");
service.addProduct("Projetor Blulory", 659.00, "Com 4K 1200 Lux e UHD Nativo 1280*720p, LCD Video Beamer Compatível com Android OS/Tablet/PC", "Projetor Blulory.jpg");
service.addProduct("Galaxy Tab S7 FE", 3719.00, 'TABLET SAMSUNG T735 com 4G e memoria RAM, 12.4", 128GB de memoria interna. Cor: PRETO MAN', "Galaxy Tab.jpg");
service.addProduct("Smart TV Samsung", 5299.00, "Smart TV Samsung 50 polegadas UHD 4K 2021", "Smart TV.jpg");
service.addProduct("Drone DJI", 2499.99, "Drone Integrado com Sensor CMOS e Câmera 4K para gravação de videos", "Drone.jpg");
service.addProduct("Headphone Sony", 2077.00, "Fone sem Fio, Conexão Bluetooth 5.1, 30h de bateria, espumas macias e abs flexivel", "Headphone.jpg");
service.addProduct("SoundBar JBL", 1120.00, "SoundBar de Design compacto e som Dolby Digital com facil conexão", "JBL, Soundbar.jpg");
service.addProduct("Fire TV Stick Lite", 217.55, "Fire TV Amazon Stick Lite com Controle Remoto Lite por Voz com Alexa - Modelo 2020", "Fire TV.jpg");


service.addProductClient(0, 0, 1);
service.addProductClient(0, 1, 2);
service.addProductClient(0, 2, 1);

var allowCrossDomain = function (req: any, res: any, next: any) {
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

taserver.get('/client/:id/cart', function (req: express.Request, res: express.Response) {
  const id: number = <number><unknown>req.params.id;
  try {
    res.status(200).send(JSON.stringify(service.getClient(id).getCart()));
  } catch (err) {
    const { message } = err;
    res.status(400).send(message);
  }
})

taserver.get('/client/:id', function (req: express.Request, res: express.Response) {
  const id: number = <number><unknown>req.params.id;
  try {
    res.status(200).send(JSON.stringify(service.getClient(id)));
  } catch (err) {
    const { message } = err;
    res.status(400).send(message);
  }
})

taserver.get('/client/:id/email', function (req: express.Request, res: express.Response) {
  const id: number = <number><unknown>req.params.id;
  //res.send(JSON.stringify(service.getClient(0).getEmail()));
  try {
    res.status(200).send(JSON.stringify(service.getClient(id).getEmail()));
  } catch (err) {
    const { message } = err;
    res.status(400).send(message);
  }
})

taserver.get('/client/:id/orders', function (req: express.Request, res: express.Response) {
  const id: number = <number><unknown>req.params.id;
  try {
    res.status(200).send(JSON.stringify(service.getClient(id).getOrder()));
  } catch (err) {
    const { message } = err;
    res.status(400).send(message);
  }
})

taserver.get('/products', function (req: express.Request, res: express.Response) {
  
  try {
    res.status(200).send(JSON.stringify(service.getProducts()));
  } catch (err) {
    const { message } = err;
    res.status(400).send(message);
  }
})

taserver.post('/client/:id/orders', function (req: express.Request, res: express.Response) {
  const id: number = <number><unknown>req.params.id;

  try {
    res.status(200).send(JSON.stringify(service.makeOrder(id)));
  } catch (err) {
    const { message } = err;
    res.status(400).send(message);
  }
})

taserver.post('/client/:id/orders/:code',function (req: express.Request, res: express.Response) {
  const id: number = <number><unknown>req.params.id;
  const code: string = <string>req.params.code;
  try {
    res.status(200).send(JSON.stringify(service.cancelOrder(id, code)));
  } catch (err) {
    const { message } = err;
    res.status(400).send(message);
  }
})

taserver.post('/client/:id/cart/product/:pid', function (req: express.Request, res: express.Response) {
  // console.log('recebeu');
  
  const clientId: number = <number><unknown>req.params.id;
  const productIndex: number = <number><unknown>req.params.pid;

  console.log(`Adicionando o produto de index ${productIndex} ao cliente ${clientId}`);
  
  try {
    res.status(200).send(JSON.stringify(service.addProductClient(clientId, productIndex, 1)));
  } catch (err) {
    res.status(400).send('Erro ao adicionar produto');
  }
})


taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!!!');
})