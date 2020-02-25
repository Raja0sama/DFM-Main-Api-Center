var express = require('express'),
    router = express.Router();
const multer = require('multer');
const fs = require('fs')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
    })
var upload = multer({ storage: storage })

router
   .get('/', function (req, res) {
    res.render('Upload/index')
    })
    .post('/', upload.single('picture'), (req, res) => {
        var img = fs.readFileSync(req.file.path);
        var encode_image = img.toString('base64');
        var finalImg = {
            refer: req.body.id,
            contentType: req.file.mimetype,
            image: new Buffer(encode_image, 'base64')
        };
        db.collection('quotes').insertOne(finalImg, (err, result) => {
            console.log(result)

            if (err) return console.log(err)

            console.log('saved to database')
            const response = {
                status: true,
                message: "Success"
            }
            res.send(response)
        })
    })

module.exports = router;