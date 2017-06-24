var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));


var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/testapp');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    title: String,
    fuel: String,
    price: Number,
    new: Boolean,
    mileage: Number,
    first_registration: Date

};

// create model if not exists.
var mongoOp = mongoose.model('userLogin',userSchema);




router.get("/",function(req,res){
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
                response = {"error" : false,"message" : data};
                console.log(data);
            }
            res.json(response);
        });
    });



router.route("/addusers")
    .post(function(req,res){
        var db = new mongoOp();
        var response = {};
        // Add strict validation when you use this in Production.


        db.title = req.body.title;
        db.fuel  = req.body.fuel;
        db.price = req.body.price;
        db.new   = req.body.new;
        db.mileage = req.body.mileage;
        db.first_registration = req.body.fr;




        db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true, "message" : "Error adding data"};
            } else {
                response = {"error" : false, "message" : "Data added"};
            }
            res.json(response);
        });



    });

router.route("/users/:id")
    .get(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
        // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    });

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");