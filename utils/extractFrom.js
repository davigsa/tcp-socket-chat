const { ENCODEING } = require('../config')

const extractFromArgs = (args, flag) => {
	const index = args.findIndex(arg => arg === `--${flag}`)
	return index === -1 ? null : args[index + 1]
}

const extractFromData = (data) => {
	let act
	let cleanMsg
	const threatedData = data.toString(ENCODEING)
	const spltMsg = threatedData.split(' ')

	if (spltMsg[0].includes('/w')) {
		act = spltMsg[0].substring(1)
		cleanMsg = spltMsg.splice(2, spltMsg.length - 1).join(' ')

	} else if (spltMsg[0].includes('/')) {
		act = spltMsg[0].substring(1)
		cleanMsg = spltMsg.splice(1, spltMsg.length - 1).join(' ')

	} else {
		act = 'msg'
		cleanMsg = threatedData
  }

  return { act, spltMsg, cleanMsg }
}

module.exports = { 
	extractFromArgs, 
	extractFromData
}