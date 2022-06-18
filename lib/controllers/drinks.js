const { Router } = require('express');
const { Drink } = require('../models/Drink');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const drinks = await Drink.getAll();
      res.json(drinks);
    } catch (e) {
      next(e);
    }
  });
