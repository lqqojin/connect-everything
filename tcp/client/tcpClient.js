const net = require('net');
const { writeData } = require('../common/common');
const getConnection = (connName, tcpConfig) => {
    let client  = new net.Socket();
    client = net.connect(tcpConfig);

    client.setEncoding('utf8');
    client.setKeepAlive();
    // client.setTimeout(500);

    client.on('connect',function(){
        console.log('Client: connection established with server');

        console.log('---------client details -----------------');

        console.log(connName + ' Connected: ');
        console.log(`    local = ${client.localAddress}:${client.localPort}`);
        console.log(`    remote = ${client.remoteAddress}:${client.remotePort}`);

        var address = client.address();
        var port = address.port;
        var family = address.family;
        var ipaddr = address.address;
        console.log('Client is listening at port' + port);
        console.log('Client ip :' + ipaddr);
        console.log('Client is IP4/IP6 : ' + family);

        // writing data to server
        // client.write('hello from client');
    });

    client.on('data', (data) => {
        console.log(connName + " From Server: " + data.toString());
        // setTimeout(() => {
        //     client.end();
        // }, 2000)
    });
    client.on('end', function() {
        console.log(connName + ' Client disconnected');
    });
    client.on('error', function(err) {
        console.log('client Error: ', JSON.stringify(err));
    });
    client.on('timeout', function() {
        console.log('client Timed Out');
    });
    client.on('close', function() {
        console.log('client Closed');
    });
    return client;
}
const tcpConfig = {
    host: '127.0.0.1',
    port: '6000'
}
const localhost = getConnection('localhost', tcpConfig);

setTimeout(() => {
    console.log('write start')
    writeData(localhost, 'test')

}, 1000);
