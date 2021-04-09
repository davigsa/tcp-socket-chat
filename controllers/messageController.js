const colors = require('colors')
const { readFile } = require('fs')

const { ENCODEING } = require('../config')

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
	sendImage = (img, receiver, sender) => {
		readFile(img, { encoding: ENCODEING }, (err, data) => {
			if(!err){
				console.log(data.length);
				const fullMsg = `send an archive ${colors.bold(img)} with ${data.length} bytes`
				this.whisperMessage(fullMsg, receiver, sender)
			}
			else {
				console.log('readfile err');
				sender.write('Your document doesnt exists')
			}
		});
	}
  hasHandleBeenUsed = (data, client) => !!this.clients.find(value =>  value.name === data && value.id !== client.id)
	updateHandle = (data, client) => {
		this.clients.find(value => {
			if (value.id === client.id && !this.hasHandleBeenUsed(data, client)) {
				value.name = data
				client.write('Your username has been changed successfully :)')

			} else if (this.hasHandleBeenUsed(data, client)) {
				client.write('Username already taken, please choose another one.')

			}
		})
	}
}

module.exports = MessageController
