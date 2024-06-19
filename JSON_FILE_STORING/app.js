const express = require('express');
const bodyParser = require('body-parser');
const { create } = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
const hbs = create({ extname: '.handlebars' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'view'));
app.get('/', (req, res) => {
    res.render('form');
});
app.post('/submit', (req, res) => {
    const data = req.body;
    fs.writeFileSync('data/data.json', JSON.stringify(data, null, 2));
    res.redirect('/display');
});

app.get('/display', (req, res) => {
    const rawData = fs.readFileSync('data/data.json');
    const data = JSON.parse(rawData);

    res.render('display', { data });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.get('/', (req, res) => {
    console.log("Rendering form view");
    res.render('form');
});