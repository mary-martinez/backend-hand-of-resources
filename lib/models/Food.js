const pool = require('../utils/pool');

class Food {
  id;
  name;
  origin;
  joy;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.origin = row.origin;
    this.joy = row.joy;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from foods');
    return rows.map((row) => new Food(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from foods WHERE id=$1', [id]);
    return new Food(rows[0]);
  }

}

module.exports = { Food };