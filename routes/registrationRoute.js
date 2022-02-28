const express = require('express');
const route = express.Router();

const User = require('../schemas/UserSchema')
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const app = express()

app.use(bodyParser.urlencoded({extended: false}));

route.post('/', async (req, res,) => {
    const firstName =  req.body.firstName.trim()
    const lastName =  req.body.lastName.trim()
    const userName =  req.body.userName.trim()
    const password =  req.body.password
    const email =  req.body.email.trim()

    if (firstName && userName && lastName && userName && email && password) {
        const user = await User.findOne({
            $or: [
                {userName: userName},
                {email: email}
            ]
        }).catch((error) => {
            console.log(error)
            const errorPayload = {error: 'Something went wrong'}

            res.status(200).send(errorPayload)
        })


        if (user == null) {
            // No user found
            const data = req.body;
            data.password = await bcrypt.hash(password, 10)

            User.create(data)
                .then((user) => {})
            data.success = true;
            res.status(200).send(data)
        } else {
            // User found

            let errorPayload = {error: ''}

            if (user.email === email) {
                errorPayload.error = 'Email already in use'
            } else {
                errorPayload.error = 'User name already in use'
            }
            res.status(200).send(errorPayload)
        }


    } else {
        const error = {error: 'Make sure each field has a valid value'}

        res.status(200).send(error)
    }

})


module.exports = route
