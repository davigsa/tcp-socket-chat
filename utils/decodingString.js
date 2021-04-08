const { ENCODEING } = require('../config')

const decodingString = (str) => {
  return str.toString(ENCODEING)
}

module.exports = {
  decodingString
}