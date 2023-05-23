const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'db', // nome do serviço no docker-compose.yml
    user: 'admin',
    password: 'admin',
    database: 'easybudget'
});

module.exports = pool.promise();