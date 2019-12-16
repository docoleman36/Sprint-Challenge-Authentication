const db = require("../database/dbConfig.js");

function addUser(user) {
  return db("users")
    .insert(user)
    .then(res => {
      return { id: res[0] };
    });
}

function findBy(key) {
  return db("users")
    .where(key)
    .first();
}

module.exports = {
  addUser,
  findBy
};