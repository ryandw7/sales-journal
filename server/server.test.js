process.env.MODE = 'test';
const request = require("supertest");
const server = require('./server.js');
const { registerUser, findByUsername } = require('./db/db.js')


describe('server', ()=>{
    test('It registers a user successfully', done => {
      const body = {id: 5436, firstName: 'Ryan', lastName: 'Wilson', username: 'rwilso463', password: 'password'};
      request(server)
       .post('/api/register')
       .send(body)
       .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect(function(res){
        res.body = body;
      })
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
    });
    test('It throws an error if a value is not provided',  (done) =>{
        request(server)
        .post('/api/register')
        .send({id: 5436, firstName: 'Ryan', lastName: 'Wilson', username: 'rwilso463'})
       .expect(400)
       .end(function(err, res) {
         if (err) return done(err);
         return done();
       });
    })
})

