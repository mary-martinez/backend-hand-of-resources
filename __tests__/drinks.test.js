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
  it('/drinks/:id', async () => {
    const res = await request(app).get('/drinks/4');
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual('wine');
  });
  it('POST /drinks should add a drink', async () => {
    const res = await request(app).post('/drinks').send({
      name: 'juice',
      alcohol: false,
      carbonated: false
    });
    expect(res.status).toEqual(200);
    const res2 = await request(app).get(`/drinks/${res.body.id}`);
    expect(res2.body.name).toEqual('juice');
  });
  afterAll(() => {
    pool.end();
  });
});
