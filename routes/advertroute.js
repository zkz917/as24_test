 var express = require('express');
var router = express.Router();
var mongoOp     =   require("../models/mongo");
var schema      =   require("../validationschema")
var Validator   =   require('jsonschema').Validator;



/* GET home page. */
router.get('/', function(req, res) {
  res.json({"error" : false,"message" : "Hello World"});

});



router.route("/users")
    .get(function(req,res){
        var response = {};

        
        mongoOp.find(function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"data" : data};
            }
            res.json(response);
        });
    });



//  Return the list sort by option
router.route("/users/:option")
    .get(function(req,res){
        var response = {};

        let oneoption = req.params.option;
        console.log(typeof(oneoption));
        mongoOp.find({}).sort([[oneoption, -1]]).exec(function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"data" : data};
            }
            res.json(response);
        });
    });



// Add advert to db
router.route("/addusers")
    .post(function(req,res){
        var db = new mongoOp();
        var response = {};

        // validate the input fuel type

        var input = req.body;
        var v = new Validator();
        
        var result = v.validate(input, schema).errors;

        if (!result.length) {

                db.title = req.body.title;
                db.fuel  = req.body.fuel;
                db.price = req.body.price;
                db.new   = req.body.new;

                // only when the car is used then add mileage and Reg date to db.

                if (!req.body.new){

                    db.mileage = req.body.mileage;

                    db.first_registration = req.body.first_registration;

                }

                db.save(function(err,data){
                // save() will run insert() command of MongoDB.
                // it will add new data in collection.
                    if(err) {
                        response = {"error" :  true, "message" : err.message };
                    } else {
                        response = {"error" : false, "message" : "Data added","data":data};
                    }
                    res.json(response);
                });
            }else {

                res.status(400).json(result);
            }

    });



// Search by ID
router.route("/getoneuser/:id")
    .get(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
        // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : err.message};
            } else {
                response = {"error" : false,"data" : data};
            }
            res.json(response);
        });
    });




// Update by car advert by id
router.route("/update/:id")
    .put(function(req,res){

        var response = {};
        var mileage;
        var first_registration;

        var input = req.body;
        var v = new Validator();


        var result = v.validate(input, schema).errors;

        if (!result.length) {

            mongoOp.findByIdAndUpdate(req.params.id,input,function(err,data){
            mileage = data.mileage
            first_registration = data.first_registration

            if(err) {
                    response = {"error" : true, "message" : "wrong input"};
                } else {
                    response = {"error" : false,"message" : "updated"};

                }
                res.json(response);
                 
            });


            if (input.new && (mileage !== null) && (first_registration!== null)){
                mongoOp.findByIdAndUpdate(req.params.id,{$unset:{mileage:"",first_registration:""}},function(err,data){

                if(err) {
                    response = {"error" : true, "message" : "wrong input"};
                } else {
                    response = {"error" : false,"message" : "Remove mileage and first_registration"};
                } 
                });

            }
        }
        else{

             res.status(400).json(result);

        };


    });



// Remove by ID

router.route("/remove/:id")
    .delete(function(req,res){
        var response = {};
        mongoOp.findByIdAndRemove(req.params.id,function(err,data){
            
            if(err) {
                response = {"error" : true,"message" : err.message};
            } else {
                response = {"error" : false,"message" : "Removed the data"};
            }
            res.json(response);
        });
    });


module.exports = router;