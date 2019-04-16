const mongoose = require('mongoose');
const Truck = mongoose.model("Truck");

class Trucks {
    getAll(req, res){
        Truck.find({}, (err, trucks) => {
            if(err){
                console.log(err);
            }
            res.json({status: "ok", trucks: trucks});
        });
    }
    create(req, res){
        let truck = new Truck(req.body);
        truck.save( err => {
            if(err){
                res.json({status: "not ok", errors: err});
            } else {
                res.json({status: "ok"});
            }
        });
    }
    delete(req, res){
        Truck.findByIdAndDelete({_id: req.params._id}, err => {
            if(err){
                console.log(err);
            }
            res.json({status: "ok"});
        });
    }
}

module.exports = new Trucks();