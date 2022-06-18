const pool = require('../utils/pool');

class Drink {
  id;
  name;
  alcohol;
  carbonated;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.alcohol = row.alcohol;
    this.carbonated = row.carbonated;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT name FROM drinks');
    return rows.map((row) => new Drink(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM drinks WHERE id=$1', [id]);
    return new Drink(rows[0]);
  }

}

module.exports = { Drink };
