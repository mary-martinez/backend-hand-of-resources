const { Router } = require('express');
const { Game } = require('../models/Game');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const game = await Game.getById(req.params.id);
      res.json(game);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const games = await Game.getAll();
      res.json(games);
    } catch (e) {
      next(e);
    }
  });
