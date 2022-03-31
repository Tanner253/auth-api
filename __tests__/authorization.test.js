'use strict';

const { users, authDb } = require('../src/auth/models');
const supertest = require('supertest');
const { server } = require('../src/server.js');
const request = supertest(server);
const base64 = require('base-64');

let testUser;

beforeAll(async () => {
  await authDb.sync();
  testUser = await users.create({ username: 'Tanner', password: 'password'});
});

afterAll( async () => {
  await authDb.drop();
});

describe('Testing the Auth Routes', () => {
  test('should create an user', async () => {
    let response = await request.post('/signup').send({username: 'osknyo', password: 'password'});
    expect(response.status).toEqual(201);
  });

  test('should allow authentication header through', async () => {
    let authString = 'osknyo:password';
    let encodedString = base64.encode(authString);
    let response = await request.post('/signin').set('Authorization', `Basic ${encodedString}`);
    console.log('encodede', encodedString);
    expect(response.status).toEqual(200);
  });

});