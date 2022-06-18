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

  it('POST /foods should add a food', async () => {
    const res = await request(app).post('/foods').send({
      name: 'pasta',
      origin: 'Italy',
      joy: 9
    });
    expect(res.status).toEqual(200);
    const res2 = await request(app).get(`/foods/${res.body.id}`);
    expect(res2.body.name).toEqual('pasta');
  });

  it('PUT /foods/:id should update a food', async () => {
    const res = await request(app).put('/foods/1').send({
      joy: 9
    });
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual('pizza');
    expect(res.body.joy).toEqual(9);
  });

  it('DELETE /foods/:id should delete a food', async () => {
    const res = await request(app).delete('/foods/5');
    expect(res.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });

});
