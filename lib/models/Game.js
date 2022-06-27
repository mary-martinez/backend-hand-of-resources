const pool = require('../utils/pool');

class Game {
  id;
  name;
  type;
  minPlayers;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.minPlayers = row.min_players;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM games');
    return rows.map((row) => new Game(row));
  }

}

module.exports = { Game };
