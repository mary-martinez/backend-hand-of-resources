const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('beverages routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/beverages', async () => {
    const res = await request(app).get('/beverages');
    expect(res.status).toEqual(200);
  });
  afterAll(() => {
    pool.end();
  });
});
