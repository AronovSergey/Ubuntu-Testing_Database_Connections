const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

let db;

async function start() {
    db =  await mysql.createConnection({
        host: 'localhost',
        port: 3306, 
        user: 'root',
        password: 'password',
        database: 'pets',
    });

    app.listen(3000);
}

start();

app.get('/', async(req, res) => {
    const [users] =  await db.execute('SELECT * FROM users');
    res.send(`<ul>${users.map(user => `<li>${user.name}</li>`).join('')}</ul>`);
});