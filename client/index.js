const tcp = require('net')
const rl = require('../utils/readlineAsync')

const { PORT, ENCODEING, HOST } = require('../config')
const { extractFromArgs } = require('../utils/extractFrom')

const args = process.argv.slice(2)
const port = extractFromArgs(args, 'port')
const host = extractFromArgs(args, 'host')

const client = tcp.createConnection({ host: host || HOST, port: port || PORT }, () =>
	console.log(`Connected to ${host || HOST}:${port || PORT}`))
rl.onLine(line => {
	client.write(line)
})

rl.addCommands({
	name: 'exit',
	description: 'Exit the chat',
	func() {
		client.end()
		process.exit()
	}
})

client.setEncoding(ENCODEING)
client.on('data', data => {
	console.log(data)
})
client.on('error', () => {
	console.log('Oops! Something unexpected happend')
	process.exit(0)
})
