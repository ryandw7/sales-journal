
const request = require("supertest");
const express = require('express')
const api = require('./api.js');
const errorMiddleware = require('./middleware/errorMiddleware.js');
jest.mock('../db/dbUtils.js', () => {
  return {
    registerUser: jest.fn(),
    findByUsername: jest.fn()
  }
});
describe('Express Middleware', () => {

  test('errorMiddleware should send a 500 status if status is not set', done => {
    const app = express();
    app.get('/error', (next) => {
      const err = new Error('This error is unmapped');
      next(err);
    });
    app.use(errorMiddleware)
    request(app)
      .get('/error')
      .expect(500)
      .end(function (err) {
        if (err) return done(err);
        return done();
      });
  });
})


describe('/api/register', ()=>{
  test('It registers a user successfully', done => {
    const body = { id: 5436, firstName: 'Ryan', lastName: 'Wilson', username: 'rwilso463', password: 'password' };
    request(api)
      .post('/api/register')
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect(function (res) {
        res.body = body;
      })
      .end(function (err) {
        if (err) return done(err);
        return done();
      });
  });

  test('It throws an error if a value is not provided', done => {
    request(api)
      .post('/api/register')
      .send({ id: 5436, firstName: 'Ryan', lastName: 'Wilson', username: 'rwilso463' })
      .expect(400)
      .end(function (err) {
        if (err) return done(err);
        return done();
      });
  })
})
  

