const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api',apiRoutes);

app.use(express.static(path.join(__dirname, 'app/build/')));
app.listen(process.env.PORT || 3030);
