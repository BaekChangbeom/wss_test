//var moment = require('moment');
var Validation = require('./validation');
var validation = new Validation();

function ChatMessage() {};

ChatMessage.prototype.generateMessage = function cb(from, text, timestamp, uid) {
  return {
    from:from,
    text:text,
    createdAt:timestamp,
    uid:uid
  };
};


module.exports = ChatMessage;