const dotenv = require('dotenv');
const express = require('express');

// create express app
const app = express();

//Specifying path for .env
dotenv.config({ path: './.env'});

require('./config/database.config');

const PORT = process.env.PORT;

app.use(express.json())

// define a route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Fundonotes application. "});
});

// Require note.routes
require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});