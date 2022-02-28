const express = require('express')
const app = express()
const port = 3003;
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('./database')
const session = require('express-session')

app.use(cors());


const server = app.listen(port, () => console.log('server listette' + port));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: "bbq chips",
    resave: true,
    saveUninitialized: false,
}))
const routeLogin = require('./routes/loginRoute');
const routeRegister = require('./routes/registrationRoute');

app.use('/login', routeLogin)
app.use('/register', routeRegister)

app.get('/', (req, res, next) => {

    const payload = {
        pageTitle:'some',
        picture: ''
    }

    res.status(200).send(payload)
})
