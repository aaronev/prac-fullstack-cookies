const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

const getAllInfo = function(table) {
  return db.any(`SELECT * FROM ${table};`)
}

const getAllInfoByID = function(table, id) {
  return db.any(`SELECT * FROM ${table} WHERE id = $1;`, [id])
}

const getReviewsByAlbumID = function(id) {
  return db.any(`SELECT * FROM reviews WHERE album.id = $1`, [id])
}

module.exports = {
  getAllInfo,
  getAllInfoByID,
  getReviewsByAlbumID
}