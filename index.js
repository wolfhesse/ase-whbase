var server = module.exports.server = 'n/a';
var serve = module.exports.serve = function () {
    var app = require('http').createServer(handler)
        , io = require('socket.io').listen(app)
        , fs = require('fs');
    var port = process.env.PORT || 44000;
    var host = process.env.HOST || "0.0.0.0";
    app.listen(port, host);

    console.log("listening on " + host + ":" + port);

    function handler(req, res) {
        var base = '/io_original_server'; // wegzunehmen
        url_minus_base = req.url.replace(base, '');
        fs.readFile(__dirname + url_minus_base, /* '/index.html', */

            function (err, data) {
                //                console.log(req);
                if (err) {
                    console.error(err.message);
                    //                    console.log(err.message);
                    res.writeHead(500);
                    return res.end('Error loading index.html');
                }

                res.writeHead(200, 'Content-type: text/html');
                res.end(data);
            });
    }


    var ev = require("events");
    var em = new ev.EventEmitter();


    //var chost=process.env.HOST || "0.0.0.0";
    //var cport = process.env.PORT || 4000;
    //var client = require("socket.io-client").connect(cport,chost);
    //var client = require("socket.io-client").connect("http://0.0.0.0:4000");
    // r20150227 var client = require("socket.io-client").connect("http://10.0.0.13:49153");


    // versuch kerpen
    //var client = require("socket.io-client").connect("http://kerpen.sfe.tv:4000");
    console.log('connecting to ' + module.exports.server);
    var client = require("socket.io-client").connect(module.exports.server);
    console.log('should be connected... sooon');

    // listening side
    client.on("connect", function () {
        console.log("client connected");

        client.on("data", function (data) {
            console.log('data ' + JSON.stringify(data));
            em.emit("/process/data", data);
        });
        client.on("event", function (data) {
            console.log('event ' + JSON.stringify(data));
            em.emit("/process/event", data);
        });
        client.on("tick", function (data) {
            console.log('tick ' + JSON.stringify(data));
        });

        em.on('to-helo-mousemove', function (data) {
            console.log("to-helo-mousemove", JSON.stringify(data));
            data['srv_id'] = 'hck-socket-d';
            client.emit("helo", data);
        });

        // sending side
        //
        io.sockets.on('connection', function (socket) {

            em.on("/process/data", function (data) {
                socket.emit("/news/global", data);
            });

            em.on("/process/event", function (data) {
                socket.emit("/news/business", data);
            });

            socket.on('mousemove', function (data) {
                console.log('mousemove', data);
                data.date = new Date();
                socket.volatile.emit('/news/local', data);
                //setTimeout(function () {
                //    socket.broadcast.emit('/news/global', data);
                //}, 250);
                em.emit("to-helo-mousemove", data);
            });

            socket.on('/request/broadcast-date', function (data) {
                console.log(data);
                console.log(JSON.parse(data));
                console.log(data.sender);
                socket.broadcast.emit('/response/date', {date: new Date()});
            });

            socket.on('/request/date', function (data) {
                setTimeout(function () {
                    socket.volatile.emit('/response/date', {date: new Date()});
                }, 2500);
            });
        });

    });


};
