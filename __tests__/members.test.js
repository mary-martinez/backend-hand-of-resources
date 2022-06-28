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
    expect(res.body.length).toEqual(6);
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

  it('POST /members should create a new member', async () => {
    const res = await request(app).post('/members').send({
      name: 'Iulia',
      age: 31
    });
    expect(res.status).toBe(200);
  });

  it('PUT /members/:id should update member', async () => {
    const res = await request(app).put('/members/2').send({
      nickname: 'Mama'
    });
    expect(res.status).toBe(200);
  });

  it('DELETE /members/:id should delete a member', async () => {
    const res = await request(app).delete('/members/6');
    expect(res.status).toBe(200);

  });

  afterAll(() => {
    pool.end();
  });

});
