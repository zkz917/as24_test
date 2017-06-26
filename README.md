# as24_advert_api

### Rest API based on Node.js
You can test the following features through: ec2-34-201-31-41.compute-1.amazonaws.com:3000
Or you can download the package:
Unzip and go to as24_test folder and start the service by:
```sh
node server.js
```
The Rest API based on Node.Js and Mongodb. If you test this localhost, you need to start the mongo service first by:
```sh
mongod
```
The API will run on port 3000.
The schema of the Database is:
```javascript
{                   title: String,
                    fuel: String,
                    price: Number,
                    new: Boolean,
                    mileage: Number,
                    first_registration: Date
}
```
And the input will be checked by Json Schema:
```javascript

var schema = {
              "type": "object",
              "properties": {
              "title": {"type": "string"},
              "fuel": {"enum": ["gasoline","diesel"]},
              "mileage": {"type": "integer", "minimum": 1},
              "price": {"type": "integer", "minimum": 1},
              "new":{"type":"boolean"},
              "first_registration":{"type": "string", "format": "date"}
               }
            };
```
### Get the list of adverts
```sh
localhost:3000/users/
```
Use get method and get the following response:
```json
{
    "error": false,
    "data": [
        {
            "_id": "594ea343b1a6508e161d6c97",
            "new": true,
            "price": 1234,
            "fuel": "diesel",
            "title": "123Foasdfrd",
            "__v": 0
        },
        {
            "_id": "594ea34bb1a6508e161d6c98",
            "new": true,
            "price": 1234,
            "fuel": "diesel",
            "title": "123Foasdfrd",
            "__v": 0
        },
        {
            "_id": "594ea374b1a6508e161d6c99",
            "new": true,
            "price": 1234,
            "fuel": "diesel",
            "title": "123Foasdfrd",
            "__v": 0
        }
        ]
}
```
The list is sorted by id by default.
You can sort by any feature you want by adding the option. For example by price:
```sh
localhost:3000/users/price
```
Or by title:
```sh
localhost:3000/users/title
```
or any features included in the advert.

### Get one advert by Id
```sh
localhost:3000/getoneuser/594ea343b1a6508e161d6c97
```
The response will be:
```json
{
    "error": false,
    "data": {
        "_id": "594ea343b1a6508e161d6c97",
        "new": true,
        "price": 1234,
        "fuel": "diesel",
        "title": "123Foasdfrd",
        "__v": 0
    }
}
```
### Add one record to database
Use post method.
```sh
localhost:3000/addusers
```
And the body of the request can be:
```json
{
"title":"BMW",
"fuel":"diesel",
"price": 2345,
"new": false,
"mileage":998134,
"first_registration": "1990-09-09"
}
```
The response can be:
```json
{
    "error": false,
    "message": "Data added",
    "data": {
        "__v": 0,
        "first_registration": "1990-09-09T00:00:00.000Z",
        "mileage": 998134,
        "new": false,
        "price": 2345,
        "fuel": "diesel",
        "title": "BMW",
        "_id": "59508fa4a5f3eebee9250ad3"
    }
}
```
### Update one record by Id
Use the put method.
```sh
localhost:3000/update/594e793c4b3c2e8be326eff2
```
The body of the request can be:
```json
{
	
"title":"Ford",
"fuel":"diesel"
}
```
The response can be:
```json
{
    "error": false,
    "message": "updated"
}
```

You can update any features of the existing adver by id. Here the id is: 594e793c4b3c2e8be326eff2.
If you update the 'new' feature from 'flase' to 'true', the 'mileage' and 'first_resigstration' will be removed from the record.

### Remove one record by Id
Use the delete method.
```sh
localhost:3000/remove/594dcea5f1d3827cc3f50a17
```
You can delete any advert record by id. Here the id is: 594dcea5f1d3827cc3f50a17.

The response you may get:
```json
{
    "error": false,
    "message": "Removed the data"
}
```
## Test results
I use Mocha and supertest to run the tests.
You can start the test by going to the as24_test folder.
```sh
mocha
```
advert test
```sh
    ✓ get method should return a 200 response<br>
    ✓ should add a new advert and return data and return a 200 response
    ✓ the fuel type can only be diesel or gasoline
    ✓ type should be string
    ✓ price should be integer
    ✓ price should be integer and larger than 0
    ✓ mileage should be integer
    ✓ mileage should be integer and larger than 0
    ✓ new should be boolean
    ✓ get method should return title,price,fuel,new,mileage,first_registration
    ✓ if the new is false then it will have mileage and first_registration
    ✓ the get by id should return a 200 response
    ✓ update method should return a 200 response
    ✓ after the update the user info will be changed
    ✓ remove method should return a 200 response
    ✓ after the delete the record will not exist
```

  16 passing (135ms)

