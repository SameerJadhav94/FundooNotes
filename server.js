const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');

// create express app
const app = express();

app.use(express.json())

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
    
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Fundonotes application. "});
});

// Require note.routes
require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});