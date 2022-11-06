// создает правильный путь при использовании переменных из .env

const path = require('path');
const dotenv = require("dotenv");


const loadEnv = () => {
    // создает относительный путь к config/.env
    const envPath = path.join(__dirname, '..', 'config', '.env');

    // указывает путь к .env для dotenv.config 
    return dotenv.config({ path: envPath });
}


module.exports = loadEnv;