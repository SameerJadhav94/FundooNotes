const dotenv = require('dotenv');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger/swagger.json');

// create express app
const app = express();

//Specifying path for .env
dotenv.config({ path: './.env' });

require('./config/database.config');

const PORT = process.env.PORT;

app.use(express.json())


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// define a route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Fundonotes application. " });
});

// Require note.routes
require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;