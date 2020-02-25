var express = require('express')
const ToDb = require('./LogtoDb/index')
const UsersToDb = require('./UsersToDb/index')
router = express.Router();


router
    .get('/', function (req, res) {
        res.send('We Are In The Attendence Api <3')
    })
    .use('/LogtoDb', ToDb)
    .use('/UsersToDb', UsersToDb)




module.exports = router;