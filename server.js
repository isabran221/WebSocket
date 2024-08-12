const WebSocket = require('ws');

// Crear un servidor WebSocket en el puerto 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('Nuevo cliente conectado');

    // Escuchar los mensajes recibidos desde el cliente
    ws.on('message', function incoming(message) {
        console.log('Mensaje recibido: %s', message);

        // Enviar el mensaje a todos los clientes conectados
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', function close() {
        console.log('Cliente desconectado');
    });
});

console.log('Servidor WebSocket corriendo en ws://localhost:8080');
