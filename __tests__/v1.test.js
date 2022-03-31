'use strict';
const Collection = require('../src/models/data-collection');
const { food, clothes, db } = require('../src/models');
const supertest = require('supertest');
const { server } = require('../src/server.js');
const request = supertest(server);
const base64 = require('base-64');

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});
describe('REST API', () => {
  test('REST POST', async () => {
    let response = await request.post('/api/v1/food').send({
      name: 'taco',
      calories: 1500,
      type: 'fruit',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('taco');
  });
  
  test('REST GET ALL', async () => { 
    let response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
  });

  test('REST GET ONE', async () => { 
    let response = await request.get('/api/v1/food/1');
    expect(response.status).toEqual(200);
  });

  test('REST PUT', async () => { 
    let response = await request.put('/api/v1/food/1').send({name: 'tacos'});
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('tacos');
  });

  test('REST DELETE', async () => { 
    let response = await request.delete('/api/v1/food/1');
    expect(response.status).toEqual(200);
  });


});
