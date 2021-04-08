const tcp = require('net')
const shortId = require('shortid')
const colors = require('colors')

const { PORT } = require('./config')
const { extractFromArgs, extractFromData } = require('./utils/extractFrom')
const { decodingString } = require('./utils/decodingString')
const MessageController = require('./controller/message')

const messageApi = new MessageController()

const server = tcp.createServer()

const args = process.argv.slice(2)
const port = extractFromArgs(args, 'port')

console.log(args)

server.on('connection', socket => {
  const id = shortId.generate()
  let newConnection = true
	socket.id = id
  socket.write('Please Enter an username:')

	socket.on('data', data => {

    if(!newConnection) {
      const { act, spltMsg, cleanMsg } = extractFromData(data)

      switch (act) {
        case 'n':
          messageApi.updateHandle(cleanMsg, socket)
          break
        case 'a':
          messageApi.broadcastMessage(cleanMsg, socket)
          break
        case 'msg':
          messageApi.broadcastMessage(cleanMsg, socket)
          break
        case 'w':
          messageApi.whisperMessage(cleanMsg, spltMsg[1], socket)
          break
        case 'c':
          socket.write('Here our commands! \n action list:\n /n change nick \n /w [nick] whisper to someone \n /a talk with everyone \n /c commands \n /whoami who are you?')
          break
        case 'whoami':
          socket.write(colors.red(socket.name))
          break
        default:
          socket.write('heyyy, you need to choose an action! \n action list:\n /n change nick \n /w [nick] whisper to someone \n /a talk with everyone')
          break;
      }

    } else {
      newConnection = false
      if (!messageApi.alreadyLoggedIn(socket) && !messageApi.hasHandleBeenUsed(decodingString(data), socket)) {
        socket.name = decodingString(data)
        messageApi.addClient(socket)
        messageApi.broadcastMessage(`${colors.rainbow(socket.name)} joined the chat \n`, socket)
        socket.write(`Welcome ${colors.rainbow(socket.name)}, you can start chatting now`)
        return
      } else if (messageApi.hasHandleBeenUsed(data)) {
        socket.write('Username already taken, please choose another one.')
      } else {
        socket.write('You`re already logged in.')
      }
    }

  })
  
	socket.on('end', () => process.send(new Error(`${socket.name || socket.id} disconnected`)))
	socket.on('error', () =>
		process.emitWarning(new Error(`${socket.name || socket.id} disconnected`)))
})

server.on('error', () => process.emitWarning(new Error('Something went wrong!')))

server.listen(port || PORT, () =>
	process.stdout.write(`Server started on port ${port || PORT}\n`))
