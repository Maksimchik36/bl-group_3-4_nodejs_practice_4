
const { connect } = require('mongoose');
const loadEnv = require('./loadEnv');
require("colors");


loadEnv();

const { MONGODB_URI } = process.env;

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

// коннектится к базе данных
const connectDb = async () => {
try {
    const db = await connect(MONGODB_URI);    
    // деструктуризирует параметры
    const { host, port, name } = db.connection;
    console.log(`MongoDB are connected on host: ${host}, on port: ${port}, dbName: ${name}`.bold.cyan.italic);
    
    return db;
} catch (error) {
    console.log(error.message.red.bold);   
    process.exit(1);
}
};
    

module.exports = connectDb;