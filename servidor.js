var http = require('http');
var HttpDispatcher = require('httpdispatcher');
var enrutador = new HttpDispatcher();
var fs = require('fs');

//maneja una petición
function handleRequest(request, response){
        console.log("Peticion:");
        console.log(request.url);
        enrutador.dispatch(request, response);

}
//creamos el servidor y lo ponemos a escuchar en el puerto 8888
var server = http.createServer(handleRequest);
server.listen(8888, function(){
    console.log("Arrancado y escuchando en el puerto 8888");
});

//creamos la función que trata un GET de la raiz en el enrutador 
//para que cargue el fichero index.html y lo devuelva en la respuesta
enrutador.onGet("/", function(req, res) {

   var retHtml = function(content) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(content, 'utf-8');
   }

   var retError = function(code, content) {
     res.writeHead(code, {'Content-Type': 'text/plain'});
     res.end(content);
   }
   fs.readFile('./index.html', function(error, content) {
      if (error) {
        retError(500);
      } else {
        retHtml(content);
      }
   });
});
