const Sequelize = require("sequelize");
const S = Sequelize;

let db = new Sequelize('postgres://postgres:uriel2001@localhost:5432/pern_todo', {
    logging: false,
  });

const Todo = db.define('todos', {
    description: {
        type: S.STRING,
        allowNull: false
    }
});

Todo.sync()

module.exports = Todo;