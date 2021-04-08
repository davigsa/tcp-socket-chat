# Trabalho Interconexão de Redes I - Aplicação com websocket

O trabalho prático consiste em uma aplicação de rede. A ideia principal da aplicação é ser um batepapo entre usuários conectados. A aplicação pode seguir a arquitetura cliente servidor ou ponto a ponto (peer-to-peer). 

## Os requisitos do trabalho são os seguintes:

-[x] A aplicação deve ser toda desenvolvida pelo estudante. Não pode ser usado qualquer software para agir como cliente ou servidor (ou nó peer-to-peer).
-[] Ao se conectar, o usuário deve ser capaz de escolher o endereço do servidor, a porta do serviço e um nome de usuário que não esteja em uso.

- Deve ser apresentado um esquema do protocolo a ser implementado pela aplicação:
1. Quais são as mensagens trocadas?
2. Qual é o formato das mensagens?
3. Qual é o diagrama de sequência das mensagens?

-[x] Os usuários devem ser capazes de mandar mensagens para todos ao mesmo tempo (broadcast) ou mensagens privadas para outro usuário.
-[] Ao mandar mensagens privadas, o usuário deve ser capaz de mandar arquivos (fotos, zip, exe  ou qualquer outro tipo de arquivo).
Limite do tamanho do arquivo --> 20MB.

### Pontuação
- Apresentar uma aplicação própria e funcional com socket não blocante --> 2pts
- Definição do protocolo de aplicação e diagrama de mensagens --> 2pts
- Funcionalidades de envio de mensagem privada e em broadcast --> 2pts
- Funcionalidade de envio de arquivos --> 2pts
- Envio de arquivos grandes (até 20MB) --> 2pts

### Pontos extras
- Interface gráfica --> 1 pt
- Uso da arquitetura peer-to-peer com roteamento de mensagens entre usuários na camada de aplicação --> 2pts
- Uso do protocolo de transporte UDP com controle de erro e retransmissão na aplicação --> 3 pts
