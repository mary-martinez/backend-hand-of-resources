const request = require('supertest');
const setup = require('../data/setup');
const pool = require('../lib/utils/pool');
const app = require('../lib/app');

describe('members routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/members should return a list of member names', async () => {
    const res = await request(app).get('/members');
    expect(res.body.length).toEqual(5);
    expect(res.body[0].name).toEqual('Marty');
  });

  it('/members/:id should return a family member with details', async () => {
    const res = await request(app).get('/members/3');
    expect(res.body).toEqual({
      id: '3',
      name: 'Olivia',
      nickname: 'LiviLou',
      age: 1
    });
  });

  afterAll(() => {
    pool.end();
  });

});
