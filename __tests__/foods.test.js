const request = require('supertest');
const setup = require('../data/setup');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');

describe('foods routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/foods should return a list of foods', async () => {
    const res = await request(app).get('/foods');
    expect(res.status).toBe(200);
  });

  afterAll(() => {
    pool.end();
  });

});

