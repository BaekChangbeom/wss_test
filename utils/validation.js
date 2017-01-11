function Validation() {};

Validation.prototype.isRealString = function cb(str)  {
  return typeof str === 'string' && str.trim().length > 0;
};

module.exports = Validation;
