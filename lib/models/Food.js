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

  static async insert({ name, origin, joy }) {
    const { rows } = await pool.query('INSERT INTO foods (name, origin, joy) VALUES ($1, $2, $3) RETURNING *', [name, origin, joy]);
    return new Food(rows[0]);
  }

  static async updateById(id, attrs) {
    const food = await this.getById(id);
    if (!food) return null;
    const { name, origin, joy } = { ...food, ...attrs };
    const { rows } = await pool.query(`
    UPDATE foods 
    SET name=$2, origin=$3, joy=$4 
    WHERE id=$1
    RETURNING *`, [id, name, origin, joy]);
    return new Food(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM foods WHERE id=$1 RETURNING *', [id]);
    return new Food(rows[0]);
  }

}

module.exports = { Food };
