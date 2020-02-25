var express = require('express'),
router = express.Router();
const ZKLib = require('zklib');

ZK = new ZKLib({
    ip: '192.169.0.201',
    port: 4370,
    inport: 5200,
    timeout: 5000,
  });

router
    .get('/:id', function (req, res) {
        const id = req.params.id
        let query = {}
        if(req.query.date){
            const Date = JSON.parse(req.query.date)
            let date = {}
           date = Date.d == "all" ? {...date}:{...date,"date.date":Date.d}
           date = Date.m == "all" ? {...date}:{...date,"date.month":Date.m}
           date = Date.y == "all" ?{...date}:{...date,"date.year":Date.y}
           isEmpty(date) ? query = {...query} : query = {...query,...date}  
        }
        if(req.query.time){
            const Time = JSON.parse(req.query.time)
            console.log(Time)
            let time = {}
            time = Time.h == "all" ? {...time}:{...time,"CorrectTime.Houres":Time.h}
            time = Time.s == "all" ? {...time}:{...time,"CorrectTime.seconds":Time.s}
            time = Time.m == "all" ?{...time}:{...time,"CorrectTime.minutes":Time.m}
            isEmpty(time) ? query = {...query} : query = {...query,...time}  
        }
       conditions =  id == "all" ? {...query} :{...query,id:parseInt(id)}
        db.collection("attendence").find(conditions).toArray((err, result) => {
            if (err) throw err;
            // let a = ""
            res.send(result)
        })
    })
    .post('/', (req, res) => {
        ZK.connect(function(err) {
        if (err)  return res.send("Cannot Connect to the machine");

        // read the time info from th device
        ZK.getAttendance(function(err, t) {
            // disconnect from the device
            ZK.disconnect();

            if (err)  return res.send("No More Records");
            console.log("AS")
            res.send(t)
            // db.collection('attendence').insertMany(t.map((a,i)=>{
            //     return {
            //         ...a,
            //         CorrectTime : msToHuman(a.timestamp.getTime(),a.timestamp.getHours()),
            //         date : getDat(a.timestamp)
            //     }
            //     }),(err, result) => {
            //     if (err)  return res.send("Error while inserting data in to DB");
            
            //     const response = {
            //         status: true,
            //         message: "Success : Machine Logs Inserted to Db"
            //     }
            //     res.send(response)
            //     // DeleteRecords(res)

            // })
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
            db.collection('attendence').drop((err, result) => {
                if (err)  return res.send("Error while Droped the Table");
                const response = {
                    status: true,
                    message: "Success : DB Database Droped"
                }
                res.send(response)
            })
        });
        });

    })
    .post('/removeLogs', (req, res) => {
        DeleteRecords(res)

    })

    function DeleteRecords(res){
            ZK.connect(function(err) {
                if (err) res.send("Cannot Connect to the machine");

                // read the time info from th device
                ZK.clearAttendanceLog(function(err, t) {
                  // disconnect from the device
                  ZK.disconnect();

                  if (err)  return res.send("Problem while Deleteing Data!");

                  const response = {
                    status: true,
                    message: "Success : Machine Logs Deleted"
                }
                res.send(response)
                });
              });

    }
    // msToHuman(a.timestamp.getTime(),a.timestamp.getHours())
    function msToHuman(duration,h) {
        var milliseconds = parseInt((duration%1000)/100)
            seconds = parseInt((duration/1000)%60)
            minutes = parseInt((duration/(1000*60))%60)
            hours = parseInt((duration/(1000*60*60))%24);
        
        
         return  {Houres : h, minutes: minutes, seconds : seconds}
             }
     const getDat = (currentDate) => {
        var date = currentDate.getDate();
        var month = currentDate.getMonth(); //Be careful! January is 0 not 1
        var year = currentDate.getFullYear();
        
        return {date : date, month : (month + 1), year : year};
     }
     function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
module.exports = router;