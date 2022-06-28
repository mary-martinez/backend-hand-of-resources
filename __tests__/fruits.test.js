const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/fruits should return a list of fruits', async () => {
    const res = await request(app).get('/fruits');
    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(4);
    expect(res.body[0].name).toEqual('Apple');
  });
  it('/fruits/:id should return details of a fruit', async () => {
    const res = await request(app).get('/fruits/2');
    expect(res.status).toEqual(200);
    expect(res.body.type).toEqual('Berry');
  });
  it('POST /fruits should add a fruit', async () => {
    const res = await request(app).post('/fruits').send({
      name: 'Pineapple',
      type: 'Tropical'
    });
    expect(res.status).toEqual(200);
    const res2 = await request(app).get(`/fruits/${res.body.id}`);
    expect(res2.body).toEqual({
      id: res.body.id,
      name: 'Pineapple',
      type: 'Tropical'
    });
  });
  it('PUT /fruits/:id should update a fruit', async () => {
    const res = await request(app).put('/fruits/1').send({
      type: 'General'
    });
    expect(res.status).toEqual(200);
    const res2 = await request(app).get('/fruits/1');
    expect(res2.body.type).toEqual('General');
  });
  it('DELETE /fruits/:id should delete a fruit', async () => {
    const res = await request(app).delete('/fruits/1');
    expect(res.status).toEqual(200);
  });
  afterAll(() => {
    pool.end();
  });
});
