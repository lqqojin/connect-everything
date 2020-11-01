const os = require('os');

const getIpAddress = () => {
    const networkInterfaces = os.networkInterfaces();
    for(let devName in networkInterfaces) {
        const network = networkInterfaces[devName];
        for (let i = 0, len = network.length; i < len; i += 1) {
            const alias = network[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                console.log(network);
                return alias.address;
            }
        }
    }
}
module.exports = {
    getIpAddress
};
