const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

const getAlbums = function() {
  return db.any("SELECT * FROM albums;")
}

const getReviews = function() {
  return db.any("SELECT * FROM reviews ORDER BY timestamp;")
}

module.exports = {
 getAlbums,
 getReviews,
}