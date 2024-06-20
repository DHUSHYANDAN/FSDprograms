const express = require('express');
const bodyParser = require('body-parser');
const exphbs=require('express-handlebars')
const mysql = require('mysql2');
// const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static( 'public')); // Serve static files
// app.use(express.static(path.join(__dirname, 'public')));

//app  view engine
const handlebars=exphbs.create({extname:'.hbs'});
app.engine("hbs",handlebars.engine);
app.set('view engine', 'hbs');
         // app.set('view engine', 'ejs');


// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kvcet1234',  // replace with your MySQL password
    database: 'eventDB'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Create Event
app.post('/', (req, res) => {
    const { name, registration_number, dept, dob, email, description } = req.body;
    const sql = 'INSERT INTO new_events (name, registration_number, dept, dob, email, description) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, registration_number, dept, dob, email, description], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                
                res.status(400).send("<script>alert('Error: Duplicate registration number. Please use a different registration number.')</script>");
            } else {
                
                throw err;
            }
        } else {
            res.redirect('/Details'); // Redirect to the form after submission
        }
    });
});

// Read Events
app.get('/Details', (req, res) => {
    const sql = 'SELECT * FROM new_events';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update Event


// Delete Event


// Serve the HTML file
app.get('/', (req, res) => {
    res.render( 'index');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})