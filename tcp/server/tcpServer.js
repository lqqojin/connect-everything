const net = require('net');
const { getIpAddress }= require('../../util/common')


const PORT = 6000;

const writeData = (socket, data) => {
    const success = !socket.write(data);
    if (!success) {
        ((socket, data) => {
            socket.once('drain', () => {
                writeData(socket, data);
            })
        })(socket, data);
    }
}

const tcpServer = net.createServer((client) => {
    console.log(`Client Connection > ${client.localAddress}:${client.localPort}`) ;
    client.setKeepAlive();
    client.setEncoding('utf-8');
    client.on('data', (data) => {
        const strData= data.toString();
        console.log(`Received data from client on port: ${client.remotePort}| Bytes: ${client.bytesRead} | data: ${strData}`);
        writeData(client, `Sending: ${strData}`);
        console.log(`Send Bytes: ${client.bytesWritten}`);
    });
    client.on('end', function() {
        console.log('Client disconnected');
        setTimeout(() => {
            tcpServer.getConnections((err, count) => {
                console.log('Remaining Connections: ' + count);
            });
        }, 1000)
    });
    client.on('error', function(err) {
        console.log('Socket Error: ', JSON.stringify(err));
    });
    client.on('timeout', function() {
        console.log('Socket Timed out');
    });
})

const HOST = 'localhost'; // getIpAddress()
tcpServer.listen(PORT, HOST,() => {
    const { address, port } = tcpServer.address();
    console.log(`TCP Server Listening http://${address}:${port}`);
})
