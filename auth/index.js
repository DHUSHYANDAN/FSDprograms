var express = require("express");
const mongoose = require("mongoose")
const authRoutes = require('./routes/authRouter')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authmiddleware');



const app = express();

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

const uri = "mongodb://localhost:27017";

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


app.listen(5000, () => {
  console.log("Listening on port 5000");
})

// routes
app.get('*', checkUser);

app.use(authRoutes);

app.get('/', (req, res) => res.render('register'));

app.get('/admission', requireAuth,(req, res) => res.render('admission'));

 