var express = require('express'),
    router = express.Router();
const imp = require('../../../important.json')


router
    .get('/:id', (req, res) => {

    db.collection("quotes").find(req.params.id == "all" ? {} : {
        refer: req.params.id
    }).toArray((err, result) => {
        if (err) throw err;
        // let a = ""
        const a =  result.map(element =>  "http://"+imp.host+"/photo/" + element._id);

        res.render('Voucher/index',{id : req.params.id,data:a})
    })

    })
    


module.exports = router;