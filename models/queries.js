const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

const getAllInfo = function(table) {
  return db.any(`SELECT * FROM ${table};`)
}

const getAllInfoByID = function(table, id) {
  return db.any(`SELECT * FROM $1 WHERE id = $2;`, [table, id])
}

module.exports = {
  getAllInfo,
  getAllInfoByID
}