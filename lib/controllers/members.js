const { Router } = require('express');
const { Member } = require('../models/Member');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const members = await Member.getAll();
      res.json(members);
    } catch (e) {
      next(e);
    }
  });
