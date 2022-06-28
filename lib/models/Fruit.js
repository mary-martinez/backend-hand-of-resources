const pool = require('../utils/pool');

class Fruit {
  id;
  name;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM fruits');
    return rows.map((row) => new Fruit(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM fruits WHERE id=$1', [id]);
    return new Fruit(rows[0]);
  }
}

module.exports = { Fruit };
