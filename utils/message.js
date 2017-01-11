//var moment = require('moment');
var Validation = require('./validation');
var validation = new Validation();

function ChatMessage() {};

ChatMessage.prototype.generateMessage = function cb(from, text, timestamp, uid) {
  if (!validation.isRealString(from) || !validation.isRealString(text)) {
    return new CustomError(global.err.unauthorized, 'generateMessage error');
  }
  return {
    from:from,
    text:text,
    createdAt:timestamp,
    uid:uid
  };
};


module.exports = ChatMessage;