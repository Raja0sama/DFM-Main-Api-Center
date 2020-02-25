var express = require('express'),
router = express.Router();
const ZKLib = require('zklib');

ZK = new ZKLib({
    ip: '110.37.224.158',
    port: 4370,
    inport: 5200,
    timeout: 5000,
  });

router
    .get('/:id', function (req, res) {
        db.collection("ATusers").find(req.params.id == "all" ? {}:{userid : req.params.id}).toArray((err, result) => {
            if (err) throw err;
            // let a = ""
            res.send(result)
        })
    })
    .post('/', (req, res) => {
        ZK.connect(function(err) {
        if (err)  return res.send("Cannot Connect to the machine");

        // read the time info from th device
        ZK.getUser(function(err, t) {
            // disconnect from the device
            ZK.disconnect();

            if (err)  return res.send("0 or none People register");
          //  db.collection('ATusers').drop();
            db.collection('ATusers').insertMany(t,(err, result) => {
                if (err)  return res.send("Error while inserting data in to DB");
              
                res.send('Successfull Write in DB')
            })
        });
        });

    })
    .post('/remove', (req, res) => {
        ZK.connect(function(err) {
        if (err)  return res.send("Cannot Connect to the machine");

        // read the time info from th device
        ZK.getUser(function(err, t) {
            // disconnect from the device
            ZK.disconnect();

            if (err)  return res.send("0 or none People register");
            db.collection('ATusers').drop((err, result) => {
                if (err)  return res.send("Error while Droped the Table");
              
                res.send('Successfull Drop in DB')
            })
        });
        });

    })

module.exports = router;