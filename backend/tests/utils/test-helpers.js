const randomId = (prefix = 'test') => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

module.exports = {
  randomId
};