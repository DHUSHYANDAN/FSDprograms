const express = require('express');
const bodyParser = require('body-parser');
const exphbs=require('express-handlebars')
const mysql = require('mysql2');
const routes=require("./server/routes/students")

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static( 'public')); 
// app.use(express.static(path.join(__dirname, 'public')));

//app  view engine
const handlebars=exphbs.create({extname:'.hbs'});
app.engine("hbs",handlebars.engine);
app.set('view engine', 'hbs');
         // app.set('view engine', 'ejs');

// Serve the HTML file
app.use('/',routes);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})