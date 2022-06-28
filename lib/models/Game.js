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

  static async updateById(id, attrs) {
    const game = await Game.getById(id);
    if (!game) return null;
    const { name, type, minPlayers } = { ...game, ...attrs };
    const { rows } = await pool.query(`
    UPDATE games
    SET name=$2, type=$3, min_players=$4
    WHERE id=$1
    RETURNING *`, [id, name, type, minPlayers]);
    return new Game(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM games WHERE id=$1 RETURNING *', [id]);
    return new Game(rows[0]);
  }

}

module.exports = { Game };
