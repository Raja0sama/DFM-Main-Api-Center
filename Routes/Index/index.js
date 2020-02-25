var express = require('express'),
    router = express.Router();
const Upload = require('./Upload/index')
const Voucher = require('./Voucher/index')
const Photo = require('./Photo/index')


router
    .get('/', function (req, res) {
        res.send('DONE !')
    })
    .use('/uploadphoto', Upload)
    .use('/vouchers', Voucher)
    .use('/photo',Photo)




module.exports = router;