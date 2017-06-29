const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

const getAllInfoFromTable = function(table) {
  return db.any(`SELECT * FROM ${table} ORDER BY timestamp DESC;`)
}

const getAllInfoByColumnID = function(table, columnID, id) {
  return db.any(`SELECT * FROM ${table} WHERE ${columnID} = $1 ORDER BY timestamp DESC;`, [id])
}

const addUsers = function(name, email, password, image){
  return db.none(`INSERT INTO users (name, email, password, image)
    VALUES ($1, $2, $3, $4);`, [name, email, password, image])
}

const addReviews = function(user_id, album_id, review){
  return db.none(`INSERT INTO reviews (user_id, album_id, review)
    VALUES ($1, $2, $3);`, [user_id, album_id, review])
}

const deleteReviewByID = function(id) {
  return db.none(`DELETE FROM reviews WHERE id = $1;`, id)
} 

module.exports = {
  getAllInfoFromTable,
  getAllInfoByColumnID,
  addUsers,
  addReviews,
  deleteReviewByID
}