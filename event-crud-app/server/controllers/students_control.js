const mysql = require('mysql2');
const moment = require('moment');


// MySQL Connection Pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'kvcet1234',  // replace with your MySQL password
    database: 'eventDB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


//User can see this page first
module.exports.home = (req, res) => {
   
    res.render('home' );
}


//Get the details  Get method
module.exports.index = (req, res) => {
    db.query('SELECT * FROM new_events', (err, rows) => {
        if (err) {
            console.log('Error in listing data', err);
            return res.status(500).send('Error in listing data');
        }

        const formattedRows = rows.map(row => ({
            ...row,
            dob: moment(row.dob).format('DD-MM-YYYY')
        }));

        res.render('index', { rows: formattedRows });
        // console.log({ formattedRows });
    });
};

// Create Event post method
module.exports.detailspost=  (req, res) => {
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
            res.redirect('/adduser'); // Redirect to the form after submission
        }
    });
};


// to view the edit page
module.exports.detailsupdateget = (req, res) => {
    let registration_number = req.params.registration_number; 
    db.query('SELECT * FROM new_events WHERE registration_number = ?', [registration_number], (err, rows) => {
        if (err) {
            console.log('Error in listing data', err);
            return res.status(500).send('Error in listing data');
        }
        if (rows.length === 0) {
            return res.status(404).send('Student not found');
        }
        const student = rows[0]; 
        const formattedStudent = {
            ...student,
            dob: moment(student.dob).format('YYYY-MM-DD')  
        };

        res.render('edit', { student: formattedStudent });
    });
};


//edit the users update method
module.exports.detailsupdate = (req, res) => {
    const { name, registration_number, dept, dob, email, description } = req.body;
    const sql = 'UPDATE new_events SET name = ?, registration_number = ?, dept = ?, dob = ?, email = ?, description = ? WHERE registration_number = ?';
    db.query(sql, [name, registration_number, dept, dob, email, description, registration_number], (err, result) => {
        if (err) {
            console.log('Error in updating data', err);
            return res.status(500).send("<script>alert('Error: Unable to update the record. Please try again later.')</script>");
        } else {
            if (result.affectedRows === 0) {
                return res.status(404).send("<script>alert('Error: No record found with the provided id.')</script>");
            } else {
                res.redirect('/adduser');
            }
        }
    });
};




// to view the delete page
module.exports.detailsdeleteget = ( (req, res) => {
    let registration_number = req.params.registration_number; 
    db.query('SELECT * FROM new_events WHERE registration_number = ?', [registration_number], (err, rows) => {
        if (err) {
            console.log('Error in listing data', err);
            return res.status(500).send('Error in listing data');
        }
        if (rows.length === 0) {
            return res.status(404).send('Student not found');
        }
        const student = rows[0]; 
        const formattedStudent = {
            ...student,
            dob: moment(student.dob).format('YYYY-MM-DD')  
        };

        res.render('delete', { student: formattedStudent });
    });
});

//delete the users Delete method
module.exports.detailsdelete = (req, res) => {
    const {registration_number } = req.body;
    const sql = 'DELETE FROM new_events WHERE registration_number = ?';
    db.query(sql, [registration_number], (err, result) => {
        if (err) {
            console.log('Error in deleting data', err);
            return res.status(500).send('Error in deleting data');
        } else {
            if (result.affectedRows === 0) {
                return res.status(404).send("<script>alert('Error: No record found with the provided id.')</script>");
            } else {
                res.redirect('/adduser');
            }
        }
    });
};
