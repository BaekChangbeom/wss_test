var path = require('path');
var http = require('http');
var express = require('express');
var socketIO = require('socket.io');

// global変数宣言
// global = require('../config/global').create('chat');

// メール初期設定
// require(path.join(global.path.lib, 'mail')).create(global.config);
// require(path.join(global.path.lib, 'mail_template')).init(global);
// require(path.join(global.path.lib, 'push')).init(global);
// require(path.join(global.path.lib, 'swift')).init(global);
// var auth = require(path.join(global.path.lib, 'auth'));

var ChatMessage = require('./utils/message');
var Validation = require('./utils/validation');

// var database = require(path.join(global.path.lib, 'database'));
// database.connect();

// var Users = require('./utils/users');
// var Rooms = require('./utils/room');

// var port = global.config.server.port;
var port = 5000;
var app = express();
var server = http.createServer(app);
var sio = socketIO(server);

var validation = new Validation();
//var users = new Users();

var chatMessage = new ChatMessage();

// var log4js = require('log4js');
// logger = log4js.getLogger('action');

// var errHandler = require(path.join(global.path.lib, 'error'));
// CustomError = errHandler.CustomError;

sio.on('connection', function cb(socket) {
    // 利用しない
    socket.on('joinByName', function cb(params) {
        if (!validation.isRealString(params.id) || !validation.isRealString(params.room)) {
            //return callback('Name and room name are required.');
        }
        socket.join(params.room);

        sio.to(params.room).emit('newMessage', chatMessage.generateMessage('Admin', params.id + ' has joined.'));
    });

    socket.on('join', function cb(params) {
        // if (!validation.isRealString(params.token)) {
        //     //例外処理
        //     logger.error("x-teddy-token failed to validate")
        //     socket.disconnect(true);
        // }

        // rooms.join(params.token, params.room, socket.id, function cb(err, room) {
        //     if(err) {
        //         logger.error("Failed to join : socket id : " + socket.id, + ' token : ' + params.token + ' room : ' + params.room);
        //         socket.disconnect(true);
        //     }
            
        //     else {
        //         socket.join(room.id);

        //         logger.info("emit joinSuccess");
        //         sio.to(room.id).emit('joinSuccess');
        //     }
        // });
        sio.emit('joinSuccess');

    });

    socket.on('createMessage', function cb(message) {
        // var room = rooms.getRoomBySocketId(socket.id);
        // var user = rooms.getUserBySocketId(socket.id);

        // if (room && validation.isRealString(message.text)) {
        //     if(undefined ===  message.uid) {
        //         logger.error("Message's UID is undefined");
        //         return;
        //     }

        //     rooms.saveMessage(room.id, user, message.text, function cb(error, messageInfo) {
        //         if(undefined !== error) {
        //             logger.error("rooms.saveMessage has failed!");
        //             return;
        //         }
        //         var generatedMsg = chatMessage.generateMessage(user.id, message.text, messageInfo.created, message.uid); 

        //         sio.to(room.id).emit('newMessage', generatedMsg);
        //         logger.info('emitted newMessage : [' + generatedMsg.text + '] from {' + generatedMsg.from + '} at {' + generatedMsg.createdAt + '} uid : {' + generatedMsg.uid + '}' );

        //         rooms.sendPushToDisconnectedUser(room, user.index, function cb(error) {
        //             if(undefined !== error) {
        //                 logger.info('rooms.sendPushToDisconnectedUser has failed!');
        //             }
        //         });
        //     });
        // }
        var generatedMsg = chatMessage.generateMessage(undefined, message.text, undefined, undefined); 
        sio.emit('newMessage', generatedMsg);
    });

    socket.on('disconnect', function cb() {
        console.log('Teddy chatting server -  socketId\(' + socket.id +  '\) disconnected!');
        // rooms.disconnectUser(socket.id);
    })
})

server.listen(port, function cb() {
    console.log('Server started...  port : ' + port); 
});

