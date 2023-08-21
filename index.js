const express = require('express');
const app = express();
const connectTODB = require('./database/db');

connectTODB();
const port = 3000;
const routes = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


app.listen(port, () => {
    console.log('Server started on port ' + port);
});