var http = require('http');
var fs = require('fs');
var url = require("url");
var path = require("path");

var server = http.createServer(function(request, response) {
    var destino;
    if (request.url === '/') {
        destino = '/index.html';
    } else {
        destino = request.url;
    }

   if (path.extname(destino) === "") {

    response.writeHead(400, {
        'Content-Type': 'text/html'
    });
    console.log("invalido");
    var stream = fs.createReadStream("invalid.html");

    stream.pipe(response);
    

   }

   else {

    fs.open('.' + destino,"r",function menejo_del_error (err,fd) {
        if (err) {
            console.log("aca no esta");
            response.writeHead(404, {
        'Content-Type': 'text/html'
    });
    var stream = fs.createReadStream("notfound.html");

    stream.pipe(response);
                  }
        else {
                fs.close(fd, function manejo_post_apertura_y_cerrada(){
                        console.log("esta y es valido");
                        response.writeHead(200, {
                        'Content-Type': 'text/html'
                        });

                        var stream = fs.createReadStream('.' + destino);
                        stream.pipe(response);

                        });
                }
            })
             
    } // aca cierra el else groso
});

server.listen(8000, function() {
   console.log('estoy escuchando en el 8000');
   ;
});