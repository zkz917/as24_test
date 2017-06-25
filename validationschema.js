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
module.exports = schema;