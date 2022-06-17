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
    expect(res.body[0]).toEqual({
      id: '1',
      name: 'pizza',
      origin: 'Italy',
      joy: 7
    });
    expect(res.body.length).toEqual(5);
  });

  it('/foods/:id should return details of a food', async () => {
    const res = await request(app).get('/foods/2');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '2',
      name: 'sushi',
      origin: 'Japan',
      joy: 8
    });
  });

  afterAll(() => {
    pool.end();
  });

});

