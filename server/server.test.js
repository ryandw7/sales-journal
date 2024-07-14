process.env.MODE = 'test';
const request = require("supertest");
const server = require('./server.js');
const { registerUser, findByUsername } = require('./db/db.js')

jest.mock('./db/db.js', ()=>(
    {
        registerUser: jest.fn(),
        findByUsername: jest.fn()
    }
))
beforeAll(async () => {
    // Start your server once before all tests
    await server.listen();  // Adjust this line based on how your server is started
  });
  
  afterAll(async () => {
    // Close your server once after all tests
    await server.close();  // Adjust this line based on how your server is closed
  });
  


describe('server', ()=>{
    test('It registers a user successfully', (done) => {
       request(server)
       .post('/api/register')
       .send({id: 5436, firstName: 'Ryan', lastName: 'Wilson', username: 'rwilso463', password: 'password'})
       .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      })
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

