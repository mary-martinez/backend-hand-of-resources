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

}

module.exports = { Drink };
