const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    CON_ORACLE: process.env.CON_ORACLE || '',
    USERBD: process.env.USERBD || '',
    PASSBD: process.env.PASSBD || '',
}