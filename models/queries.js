const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

const getAlbums = function() {
  return db.any("SELECT * FROM albums;")
}

const getAlbumsByID = function(id) {
  return db.any("SELECT * FROM albums WHERE id = $1;", [id])
}

const getReviews = function() {
  return db.any("SELECT * FROM reviews ORDER BY timestamp;")
}

const getReviewsByAlbumID = function(id) {
  return db.any("SELECT * FROM reviews WHERE album_id = $1 ORDER BY timestamp;", [id])
}

module.exports = {
 getAlbums,
 getAlbumsByID,
 getReviews,
 getReviewsByAlbumID,
}