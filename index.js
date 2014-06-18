var connect = require('connect');
var fs = require('fs');
var c = connect();
var http = require('http');
var sanitizer = require('validator').sanitize;
var socketio  = require('socket.io');
var spawn     = require('child_process').spawn;
var uid = 0;

var server = http.createServer(function(request, response){
    response.writeHead(200, { 'Content-type': 'text/html'});
    response.end(fs.readFileSync(__dirname + '/webroot/index.html'));
    uid = randomString(32);
    console.log(uid);
}).listen('8778', '127.0.0.1');





var EventEmitter = require('events').EventEmitter;
var io = socketio.listen(server, {log: false});
var EventEmitter = require('events').EventEmitter;
var util         = require('util');






var Tail = function(path){
    EventEmitter.call(this);


    var tail = spawn('tail', ['-F'].concat(path));
    var self = this;
    this.tail = tail;
    tail.stdout.on('data', function (data) {
        var lines = data.toString('utf-8');
        console.log(lines);
        lines = lines.split('\n');
        lines.pop();
        lines.forEach(function (line) {
            self.emit('line',line);
        });
    });

    process.on('exit', function () {
        tail.kill();
    });
}

util.inherits(Tail, EventEmitter);




var path = '/Users/xutian/workspace_baidu/webtail/test';
var path2 = '/usr/local/nginx/logs/access.log';






//var tailer = new Tail(path);

var filesSocket = io.on('connection', function (socket) {
        socket.on('msg', function (msg) {
            console.log('Message Received: ', msg);
        });
        var tailer;
        socket.on('start', function(msg){
            console.log('start');
            console.log(msg);
            if (tailer) {
                tailer.tail.kill();
            }
            tailer = new Tail(path2);
            tailer.on('line', function (line) {
                socket.emit('line',line);
            });
        })
        socket.on('stop', function(){
            tailer.tail.kill();
        })
        
});

//随机
function randomString(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

