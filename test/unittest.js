var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

var testdata;

describe('advert test', function(){


it('get method should return a 200 response', function(done){
  api.get('/users')
  .set('Accept', 'application/json')
  .expect(200, done);
})



it('should add a new advert and return data and return a 200 response', function(done){
  api.post('/addusers')
  .set('Accept', 'application/x-www-form-urlencoded')
  .send({
    title: 'Bmw',
    price:  1234,
    new:    false,
    fuel:   "diesel",
    mileage: 123,
    first_registration: "1990-09-09"
    
  })
  .expect(200)
  .end(function(err, res){
    expect(res.body.message).to.equal('Data added');
    expect(res.body.message).to.not.equal(null);
    expect(res.body.data.title).to.equal('Bmw');
    expect(res.body.data.title).to.not.equal(null);
    expect(res.body.data.price).to.equal(1234);
    expect(res.body.data.price).to.not.equal(null);
    expect(res.body.data.new).to.equal(false);
    expect(res.body.data.new).to.not.equal(null);
    expect(res.body.data.fuel).to.equal('diesel');
    expect(res.body.data.fuel).to.not.equal(null);
    expect(res.body.data.mileage).to.equal(123);
    expect(res.body.data.mileage).to.not.equal(null);
    expect(res.body.data).to.have.property('first_registration');
    expect(res.body.data.first_registration).to.not.equal(null);
    done();
  })
})



it('the fuel type can only be diesel or gasoline', function(done){
  api.post('/addusers')
  .set('Accept', 'application/x-www-form-urlencoded')
  .send({
    title: 'Kevin',
    price:  1234,
    new:    true,
    fuel:   "notdiesel"
    
  })
  .expect(400,done)
})



it('type should be string', function(done){
  api.post('/addusers')
  .set('Accept', 'application/x-www-form-urlencoded')
  .send({
    title: 1
  })
  .expect(400,done);
 
})



it('price should be integer', function(done){
  api.post('/addusers')
  .set('Accept', 'application/x-www-form-urlencoded')
  .send({
    price: "asdf"
  })
  .expect(400,done);
 
})



it('price should be integer and larger than 0', function(done){
  api.post('/addusers')
  .set('Accept', 'application/x-www-form-urlencoded')
  .send({
    price: -2
  })
  .expect(400,done);
 
})



it('mileage should be integer', function(done){
  api.post('/addusers')
  .set('Accept', 'application/x-www-form-urlencoded')
  .send({
    title: 'BMW',
    price:  1234,
    new:    true,
    fuel:   "diesel",
    new: false,
    mileage: "1234",
    first_registration:"2009-09-09"
  })
  .expect(400,done);
 
})



it('mileage should be integer and larger than 0', function(done){
  api.post('/addusers')
  .set('Accept', 'application/x-www-form-urlencoded')
  .send({
    title: 'BMW',
    price:  1234,
    new:    true,
    fuel:   "diesel",
    new: false,
    mileage: -9,
    first_registration:"2009-09-09"
  })
  .expect(400,done);
 
})



it('new should be boolean', function(done){
  api.post('/addusers')
  .set('Accept', 'application/x-www-form-urlencoded')
  .send({
      new:"asdf"
  })
  .expect(400,done);
 
})



it('get method should return title,price,fuel,new,mileage,first_registration', function(done){
  api.get('/users')
  .set('Accept', 'application/json')
  .expect(200)
  .end(function(err, res){
    expect(res.body.data[0]).to.have.property('title');
    expect(res.body.data[0].title).to.not.equal(null);
    expect(res.body.data[0]).to.have.property('price');
    expect(res.body.data[0].price).to.not.equal(null);
    expect(res.body.data[0]).to.have.property('new');
    expect(res.body.data[0].new).to.not.equal(null);
    expect(res.body.data[0]).to.have.property('fuel');
    expect(res.body.data[0].fuel).to.not.equal(null);
    testdata = res.body.data[0]
    done();
  })
})



it('if the new is false then it will have mileage and first_registration', function(done){
  api.get('/users')
  .set('Accept', 'application/json')
  .expect(200)
  .end(function(err, res){
    expect(res.body.data[0]).to.have.property('title');
    if(!res.body.data[0].new){
      expect(res.body.data[0]).to.have.property('mileage');
      expect(res.body.data[0]).to.have.property('first_registration');
    }
    done();
  })
})



it('the get by id should return a 200 response', function(done){
  api.get('/getoneuser/'+testdata._id)
  .set('Accept', 'application/json')
  .expect(200,done);

})




it('update method should return a 200 response', function(done){
  api.put('/update/'+ testdata._id)
  .set('Accept', 'application/x-www-form-urlencoded')
  .send({
    title: 'Benz',
    price:  11234,
    fuel:   "diesel",

  })
  .expect(200,done);
 
})



it('after the update the user info will be changed', function(done){
  api.get('/getoneuser/'+testdata._id)
  .set('Accept', 'application/json')
  .expect(200)
  .end(function(err, res){
    expect(res.body.data.title).to.equal("Benz");
    expect(res.body.data.price).to.equal(11234);
    expect(res.body.data.fuel).to.equal("diesel");

    done();
  })

})



it('remove method should return a 200 response', function(done){
  api.delete('/remove/'+testdata._id)
  .set('Accept', 'application/x-www-form-urlencoded')
  .expect(200,done);
 
})



it('after the delete the record will not exist', function(done){
  api.get('/getoneuser/'+testdata._id)
  .set('Accept', 'application/json')
  .expect(200)
  .end(function(err, res){
    expect(res.body.data).to.equal(null);

    done();
  })

})







})