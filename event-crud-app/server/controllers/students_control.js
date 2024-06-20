const mysql = require('mysql2');

// MySQL Connection Pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'kvcet1234',  // replace with your MySQL password
    database: 'eventDB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports.home = (req, res) => {
    pool.query('SELECT * FROM new_events', (err, rows) => {
        if (err) {
            console.log('Error in listing data', err);
            return res.status(500).send('Error in listing data');
        }
        res.render('index', { rows },);
        console.log({rows})
    });
};