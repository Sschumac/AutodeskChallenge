const express = require('express');
const path = require('path');

const app = express.createServer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'app/build/')));
app.listen(process.env.PORT || 3030);
