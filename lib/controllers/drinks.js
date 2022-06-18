const { Router } = require('express');
const { Drink } = require('../models/Drink');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const drink = await Drink.delete(req.params.id);
      res.json(drink);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const update = await Drink.updateById(req.params.id, req.body);
      res.json(update);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const drink = await Drink.insert(req.body);
      res.json(drink);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const drink = await Drink.getById(req.params.id);
      res.json(drink);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const drinks = await Drink.getAll();
      res.json(drinks);
    } catch (e) {
      next(e);
    }
  });
