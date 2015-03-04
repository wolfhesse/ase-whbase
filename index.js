var server = module.exports.server = 'n/a';
var serve = module.exports.serve = function() {
	var app = require('http').createServer(handler)
		, io = require('socket.io').listen(app)
		, fs = require('fs');
	var port = process.env.PORT || 44000;
	var host = process.env.HOST || "0.0.0.0";
	app.listen(port, host);

	console.log("listening on "+host+":"+port);

	function handler(req, res) {
		var base = '/io_original_server' // wegzunehmen
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
	var client = require("socket.io-client").connect(server);

	// listening side
	client.on("connect", function () {
		console.log("client connected");
		client.on("CONFIG", function (data) {
			console.log("client:CONFIG");
			//console.log(data);
			em.emit('/process/config', {srv: 'config', ts: new Date, data: data});
		});
		client.on("/u0/SCHEDULE", function (data) {
			console.log(data);
			em.emit('/process/schedule', {srv: 'schedule', ts: new Date, data: data});
		});
		client.on("CMD", function (data) {
			console.log("client:CMD");
			console.log(data.cmd);
			em.emit('/process/cmd', {srv: 'cmd', ts: new Date, data: data});
		});
	});


	// sending side
	//
	io.sockets.on('connection', function (socket) {
		em.on("/process/config", function (data) {
			socket.emit("/news/global", data);
		});
		em.on("/process/schedule", function (data) {
			socket.emit("/news/business", data);
		});
		em.on("/process/cmd", function (data) {
			socket.emit("/news/business", data);
		});

		socket.on('mousemove', function (data) {
			console.log('mousemove', data);
			data.date = new Date();
			socket.volatile.emit('/news/local', data);
			setTimeout(function () {
				socket.broadcast.emit('/news/global', data);
			}, 250);
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

}
