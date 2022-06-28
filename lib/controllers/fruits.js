const { Router } = require('express');
const { Fruit } = require('../models/Fruit');

module.exports = Router()
  .get('/:id', async(req, res, next) => {
    try{
      const fruit = await Fruit.getById(req.params.id);
      res.json(fruit);
    } catch(e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const fruits = await Fruit.getAll();
      res.json(fruits);
    } catch (e) {
      next(e);
    }
  });
