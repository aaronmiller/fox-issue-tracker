const HOST = process.env.HOST ||
             global.HOST ||
             'localhost';
const PORT = process.env.PORT ||
             global.PORT ||
             1337;
const DATABASE_URL = process.env.DATABASE_URL ||
                     global.DATABASE_URL ||
                     'mongodb://localhost/fox';

module.exports = {
  HOST,
  PORT,
  DATABASE_URL
};
