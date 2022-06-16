const { Router } = require('express');
const { Member } = require('../models/Member');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const member = await Member.insert(req.body);
      res.json(member);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const member = await Member.getById(req.params.id);
      res.json(member);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const members = await Member.getAll();
      res.json(members);
    } catch (e) {
      next(e);
    }
  });
