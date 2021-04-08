const colors = require('colors')

const { decodingString } = require('../utils/decodingString')

class MessageController {
	constructor() {
		this.clients = []
	}
	addClient = client => {
		this.clients.push(client)
	}
	alreadyLoggedIn = client => {
		const index = this.clients.findIndex(value => value.id === client.id)
		return index !== -1
	}
	broadcastMessage = (msg, sender) => {
		this.clients.forEach(client => {
			if (client.id !== sender.id) client.write(`${colors.bold(sender.name)}: ${msg}`)
		})
	}
	whisperMessage = (msg, receiver, sender) => {
		this.clients.find(client => {
			if (client.name === receiver) client.write(`${colors.magenta(colors.italic('(whisper) ') + colors.bold(sender.name) + ': ' + msg)}`)
		})
	}
  hasHandleBeenUsed = (data, client) => {
		this.clients.find(value => {
			if (value.name === data && value.id !== client.id) true 
			else false
		})
	}
	updateHandle = (data, client) => {
		this.clients.find(value => {
			if (value.id === client.id) {
				value.name = data
				client.write('Your username has been changed successfully :)')

			} else {
				client.write('Oh, no! We dont know you yet..')

			}
		})
	}

}

module.exports = MessageController
