const path = require('path');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'local';

console.log(`=======================> start ${env} mode`);
dotenv.config({ silent: true, path: path.resolve(__dirname, '.env') });

// compress or src load
require('./src/app');

process.on('uncaughtException', (err) => {
    console.log('================== uncaughtException ==================');
    console.error(err);
    console.log('=======================================================');
});
