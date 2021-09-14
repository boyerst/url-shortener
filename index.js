const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db.js')
connectDB();

const Url = require('./models/Url.js');


app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');



// Route-> Redirection
app.use('/', require('./routes/urlRedirect'));
// Route-> Shortening
app.use('/shorten', require('./routes/url'));
//Route-> Home Page
app.use('/', async (req, res) => {
  const urls = await Url.find();
  res.render('home', {
    urls: urls
  });
});



app.listen(port, () => console.log('Application started at => http://localhost:' + port));