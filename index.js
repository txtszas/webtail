var connect = require('connect');
var fs = require('fs');
var c = connect();
var http = require('http');
var sanitizer      = require('validator').sanitize;
var socketio  = require('socket.io');
var child_process = require('child_process');
var spawn        = require('child_process').spawn;


var server = http.createServer(function(request, response){
    response.writeHead(200, { 'Content-type': 'text/html'});
    console.log(__dirname);
    response.end(fs.readFileSync(__dirname + '/webroot/index.html'));
}).listen('8888', '127.0.0.1');




var EventEmitter = require('events').EventEmitter;

var io = socketio.listen(server, {log: false});

var EventEmitter = require('events').EventEmitter;
var util         = require('util');




var Tail = function(path){
    EventEmitter.call(this);


    var tail = spawn('', ['-F'].concat(path));
    var self = this;
    tail.stdout.on('data', function (data) {
        var lines = data.toString('utf-8');
        console.log(lines);
        lines = lines.split('\n');
        lines.pop();
        lines.forEach(function (line) {
            self.emit('line',line);
        });
    });

    // process.on('exit', function () {
    //     tail.kill();
    // });
}
util.inherits(Tail, EventEmitter);




var path = '/Users/xutian/workspace_baidu/webtail/test';
var path2 = '/usr/local/nginx/logs/access.log';






var tailer = new Tail(path2);

var filesSocket = io.on('connection', function (socket) {
        socket.on('msg', function (msg) {
            console.log('Message Received: ', msg);
        });
        
        

        tailer.on('line', function (line) {
            socket.emit('line',line);
        });
});



