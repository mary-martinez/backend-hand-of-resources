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

}

module.exports = { Member };