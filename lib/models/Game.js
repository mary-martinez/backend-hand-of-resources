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

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM games WHERE id=$1', [id]);
    return new Game(rows[0]);
  }

  static async insert({ name, type, minPlayers }) {
    const { rows } = await pool.query(`
    INSERT INTO games
    (name, type, min_players)
    VALUES ($1, $2, $3)
    RETURNING *`, [name, type, minPlayers]);
    return new Game(rows[0]);
  }

}

module.exports = { Game };
