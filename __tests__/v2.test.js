'use strict';

const { users, authDb } = require('../src/auth/models');

beforeAll(async () => {
  await authDb.sync();
});

afterAll(async () => {
  await authDb.drop();
});

describe('Testing the USER Model', () => {
  test('User should have a role, and list of capailities', async () => {
    let testUser = await users.create({
      username: 'oSKNYo',
      password: 'password',
    });

    let testWriter = await users.create({
      username: 'Ryan',
      password: 'password1234',
      role: 'writer',

    });
    let testEditor = await users.create({
      username: 'Jacob',
      password: 'password1234$',
      role: 'editor',
    });
    let testAdmin = await users.create({
      username: 'Admin',
      password: 'password1234$$',
      role: 'admin',
    });

    expect(testUser.role).toEqual('user');
    expect(testUser.capabilities).toBeTruthy();
    expect(testUser.capabilities.includes('read')).toEqual(true);

    expect(testWriter.role).toEqual('writer');
    expect(testWriter.capabilities).toBeTruthy();
    expect(testWriter.capabilities.includes('create')).toEqual(true);

    expect(testEditor.role).toEqual('editor');
    expect(testEditor.capabilities).toBeTruthy();
    expect(testEditor.capabilities.includes('update')).toEqual(true);

    expect(testAdmin.role).toEqual('admin');
    expect(testAdmin.capabilities).toBeTruthy();
    expect(testAdmin.capabilities.includes('delete')).toEqual(true);
  });
});
