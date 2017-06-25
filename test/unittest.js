var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

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
    title: 'Kevin',
    price:  1234,
    new:    true,
    fuel:   "diesel"
    
  })
  .expect(200)
  .end(function(err, res){
    expect(res.body.message).to.equal('Data added');
    expect(res.body.message).to.not.equal(null);
    expect(res.body.data.title).to.equal('Kevin');
    expect(res.body.data.title).to.not.equal(null);
    expect(res.body.data.price).to.equal(1234);
    expect(res.body.data.price).to.not.equal(null);
    expect(res.body.data.new).to.equal(true);
    expect(res.body.data.new).to.not.equal(null);
    expect(res.body.data.fuel).to.equal('diesel');
    expect(res.body.data.fuel).to.not.equal(null);
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




it('get method should return title,price,fuel,new,mileage,first_registration', function(done){
  api.get('/users')
  .set('Accept', 'application/json')
  .expect(200)
  .end(function(err, res){
    expect(res.body.data[0]).to.have.property('title');
    expect(res.body.data[0].title).to.not.equal(null);
    done();
  })
})





})