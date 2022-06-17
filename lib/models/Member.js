const pool = require('../utils/pool');

class Member {
  id;
  name;
  nickname;
  age;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.nickname = row.nickname;
    this.age = row.age;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT name FROM members');
    return rows.map((row) => new Member(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM members WHERE id=$1', [id]);
    return new Member(rows[0]);
  }

  static async insert({ name, nickname, age }) {
    const { rows } = await pool.query('INSERT INTO members (name, nickname, age) VALUES ($1, $2, $3) RETURNING *', [name, nickname, age]);
    return new Member(rows[0]);
  }

  static async updateById(id, attrs) {
    const member = await this.getById(id);
    if (!member) return null;
    const { name, nickname, age } = { ...member, ...attrs };
    const { rows } = await pool.query(`
      UPDATE members
      SET name=$2, nickname=$3, age=$4
      WHERE id=$1
      RETURNING *`, [id, name, nickname, age]);
    return new Member(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`DELETE FROM members WHERE id=$1 RETURNING *`, [id]);
    return new Member(rows[0]);
  }

}

module.exports = { Member };
