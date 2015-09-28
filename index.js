var server = module.exports.server = 'n/a';
var serve = module.exports.serve = function () {
    var app = require('http').createServer(http_handler)
        , io = require('socket.io').listen(app)
        , fs = require('fs');
    var port = process.env.PORT || 44000;
    var host = process.env.HOST || "0.0.0.0";
    app.listen(port, host);

    console.log("server listening on " + host + ":" + port);

    function http_handler(req, res) {
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

    console.log('server connecting to backbone ' + module.exports.server);
    var backbone = require("socket.io-client").connect(module.exports.server);
    console.log('backbone should be connected... sooon');

    var backbone_connected = false;

    em.on('to-helo-mousemove', function (data) {
        console.log("to-helo-mousemove", JSON.stringify(data));
        data['srv_id'] = 'hck-socket-d';
        if (backbone_connected)
            backbone.emit("helo", data);
    });

    // listening side
    backbone.on("connect", function () {
        backbone_connected = true;
        console.log("backbone connected");
    });
    backbone.on("disconnect", function () {
        backbone_connected = false;
        console.log("backbone disconnected");
    });

    backbone.on("data", function (data) {
        console.log('backbone data ' + JSON.stringify(data));
        em.emit("/process/data", data);
    });

    backbone.on("event", function (data) {
        console.log('backbone event ' + JSON.stringify(data));
        em.emit("/process/event", data);
    });

    backbone.on("tick", function (data) {
        console.log('backbone tick ' + JSON.stringify(data));
    });


    // sending side
    //
    io.sockets.on('connection', function (socket) {
        console.log("client connected");

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
};

