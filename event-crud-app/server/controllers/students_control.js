const mysql = require('mysql2');
const moment = require('moment');


// MySQL Connection Pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'M1H1R1J1',  // replace with your MySQL password
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
    res.render('edit' );
    
};

//edit the users update method
module.exports.detailsupdate = (req, res) => {
    let id=req.params.registration_number;
    db.query('SELECT * FROM new_events where registration_number = ?',[id], (err, rows) => {
        if (err) {
            console.log('Error in listing data', err);
            return res.status(500).send('Error in listing data');
        }

        const formattedRows = rows.map(row => ({
            ...row,
            dob: moment(row.dob).format('DD-MM-YYYY')
        }));

        res.render('/adduser', { rows: formattedRows });
        // console.log({ formattedRows });
    });
};

// to view the delete page
module.exports.detailsdeleteget = ( (req, res) => {
    res.render('delete' );
    
});

//delete the users Delete method
module.exports.detailsdelete= ( (req, res) => {
    // else {
    //     res.redirect('/adduser'); // Redirect to the form after submission
    // }
    
});

