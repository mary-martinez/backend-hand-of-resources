const { request } = require('supertest');
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
  });

  afterAll(() => {
    pool.end();
  });

});
