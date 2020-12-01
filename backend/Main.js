const express       = require('express');
const app           = express();
const path          = require('path');
const mysql         = require('mysql');
const cors          = require('cors');
const session       = require('express-session');
const MySQLStore    = require('express-mysql-session')(session);
const Router        = require('./Router');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// For Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_factory'
});

db.connect(function(err){
    if(err){
        console.log('DB error');
        throw err;
        return false;
    }
});

const sessionStore = new MySQLStore({
    expiration: (1825 * 86400 * 1000),
    endConnectionOnClose: false
}, db);

app.use(session({
    key: '83749832748326478bcakncasd',
    secret: 'skjcfir3w87cnw8er7w89rnw',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: (1825 * 86400 * 1000),
        httpOnly: false
    }
}));

let padhil = new Router(app, db);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));