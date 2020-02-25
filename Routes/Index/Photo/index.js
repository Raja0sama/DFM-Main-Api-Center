var express = require('express'),
    router = express.Router();
const {ObjectId} = require('mongodb');


router
    .get('/', function (req, res) {
    res.send('You Lost ? ')
    })
    .get('/:id', (req, res) => {
        var filename = req.params.id;

        db.collection('quotes').findOne({
            '_id': ObjectId(filename)
        }, (err, result) => {

            if (err) return console.log(err)

            res.contentType(result.contentType);
            res.send(result.image.buffer)


        })
    })


module.exports = router;