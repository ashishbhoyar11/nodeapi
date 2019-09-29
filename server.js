const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const cors = require('cors');
// create express app
const app = express();

app.use(cors());
app.options('*', cors());
// app.use((req, res, next) => 
// { 
//     res.header("Access-Control-Allow-Origin", "*"); 
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,x-access-token"); 
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); 
//     next(); 
// })
app.use(express.static(__dirname+'/public'));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});


// Require Auth routes
require('./auth/routes/auth.routes.js')(app); //routes which does't require token authentication should be placed here
app.use(require('./auth/VerifyToken')); //middleware to authenticate token
// Require Notes routes
require('./app/routes/note.routes.js')(app); //Apis to protect and use token should be
require('./contest/routes/contest.routes.js')(app); //Apis to protect and use token should be
require('./auth/routes/register.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});