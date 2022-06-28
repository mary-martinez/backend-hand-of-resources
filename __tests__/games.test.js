const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/games should return a list of games', async () => {
    const res = await request(app).get('/games');
    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(4);
    expect(res.body[0].type).toEqual('Card');
  });
  it('/games/:id should return game details for a specific game', async () => {
    const res = await request(app).get('/games/4');
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual('Candy Land');
    expect(res.body.type).toEqual('Board');
  });
  afterAll(() => {
    pool.end();
  });
});
