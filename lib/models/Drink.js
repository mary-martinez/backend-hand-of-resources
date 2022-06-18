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

  static async insert({ name, alcohol, carbonated }) {
    const { rows } = await pool.query('INSERT INTO drinks (name, alcohol, carbonated) VALUES ($1, $2, $3) RETURNING *', [name, alcohol, carbonated]);
    return new Drink(rows[0]);
  }

  static async updateById(id, attrs) {
    const current = await this.getById(id);
    if (!current) return null;
    const { name, alcohol, carbonated } = { ...current, ...attrs };
    const { rows } = await pool.query(`
    UPDATE drinks
    SET name=$2, alcohol=$3, carbonated=$4
    WHERE id=$1
    RETURNING *`, [id, name, alcohol, carbonated]);
    return new Drink(rows[0]);
  }
}

module.exports = { Drink };
