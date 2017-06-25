var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('User', function(){

  it('get method should return a 200 response', function(done){
  api.get('/users')
  .set('Accept', 'application/json')
  .expect(200, done);
})

  it('get method should return title,price,fuel,new,mileage,first_registration', function(done){
  api.get('/users')
  .set('Accept', 'application/json')
  .expect(200)
  .end(function(err, res){
    expect(res.body.message[0]).to.have.property('title');
    expect(res.body.message[0].title).to.not.equal(null);
    done();
  })
})


it('should be updated with a new title', function(done){
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
    done();
  })
})



it('type should be string', function(done){
  api.post('/addusers')
  .set('Accept', 'application/x-www-form-urlencoded')
  .send({
    title: 1
  })
  .expect(400,done);
 
})


})