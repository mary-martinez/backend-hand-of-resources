const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('drinks routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/drinks', async () => {
    const res = await request(app).get('/drinks');
    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(5);
    expect(res.body[0].name).toEqual('water');
  });
  afterAll(() => {
    pool.end();
  });
});
