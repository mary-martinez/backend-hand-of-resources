const { Router } = require('express');
const { Member } = require('../models/Member');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const deleted = await Member.delete(req.params.id);
      res.json(deleted);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const member = await Member.insert(req.body);
      res.json(member);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const update = await Member.updateById(req.params.id, req.params.body);
      res.json(update);
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
