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

  static async insert({ name, type }) {
    const { rows } = await pool.query(`
    INSERT INTO fruits
    (name, type)
    VALUES ($1, $2)
    RETURNING *`, [name, type]);
    return new Fruit(rows[0]);
  }

  static async updateById(id, attrs) {
    const fruit = await Fruit.getById(id);
    if (!fruit) return null;
    const { name, type } = { ...fruit, ...attrs };
    const { rows } = await pool.query(`
    UPDATE fruits
    SET name=$2, type=$3
    WHERE id=$1
    RETURNING *`, [id, name, type]);
    return new Fruit(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM fruits WHERE id=$1 RETURNING *', [id]);
    return new Fruit(rows[0]);
  }
}

module.exports = { Fruit };
