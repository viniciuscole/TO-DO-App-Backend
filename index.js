const express = require('express');
const app = express();
const connectTODB = require('./database/db');
const cors = require('cors');

connectTODB();
const port = 3000;
const routes = require('./routes/routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


app.listen(port, () => {
    console.log('Server started on port ' + port);
});