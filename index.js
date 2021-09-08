const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json({
  extended: false
}));
app.use(express.urlencoded({
  extended: false
}));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('home');
});
app.listen(port, () => console.log('Application started at => http://localhost:' + port));