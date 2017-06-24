
var t = require('tcomb');

// a subtype is a pair (type, predicate)
// where predicate is a function with signature (x) -> boolean


// enum
var fuel_type = t.enums.of('gasoline diesel');

// a struct is a type containing properties (i.e. a class)

var avertInput = t.struct({ 
                    title: t.String,
                    fuel: t.maybe(fuel_type),
                    price: t.Number,
                    new: t.Boolean,
                    mileage: t.Number,
                    first_registration: t.String
                    });


module.exports = {
 avertInput: avertInput,
 fuel_type: fuel_type
};