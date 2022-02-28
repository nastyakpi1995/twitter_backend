const express = require('express');
const User = require('../schemas/UserSchema')
const bcrypt = require('bcrypt')
const bodyParser = require("body-parser");
const route = express.Router()
const app = express()


app.use(bodyParser.urlencoded({extended: false}));

route.post('/', async (req, res) => {
    const password = req.body.logPassword;
    const userName = req.body.logUserName;
    let error = {}
    if (userName && password) {

        const user = await User.findOne({
            $or: [
                {email: userName},
                {userName: userName}
            ]
        }).catch((error) => {
            console.log(error)
            const errorPayload = {error: 'Something went wrong'}

            res.status(200).send(errorPayload)
        })

            if (user != null) {
                const result = await bcrypt.compare(password, user.password)

                if (result === true) {
                    const success = {success: true}
                    return res.status(200).send(success)
                }
            }

        error.error = 'email or userName is not correct'
        return res.status(200).send(error)
    }

    error.error = 'Login credentials incorrect'
    res.status(200).send(error)
})

module.exports = route;
