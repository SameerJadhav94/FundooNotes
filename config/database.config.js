const mongoose = require('mongoose');
const dbConfig = process.env.DATABASE;
// Connecting to the database
mongoose.connect(dbConfig, {
    useNewUrlParser: true   
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
      