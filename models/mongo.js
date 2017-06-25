var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/testapp');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = { title: String,
                    fuel: String,
                    price: Number,
                    new: Boolean,
                    mileage: Number,
                    first_registration: Date
                  };

// create model if not exists.
module.exports = mongoose.model('userLogin',userSchema);