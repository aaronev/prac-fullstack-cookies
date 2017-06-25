const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models/queries.js')
const app = express()

require('ejs')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Non-Users

app.get('/', (req, res, next) => {
  db.getAlbums()
  .then(albums => {
    db.getReviews()
    .then(reviews => {
      res.render('body', {
        auth: null,
        user: null,
        albums: albums, 
        reviews:reviews
      })
    })
  })
})

app.get('/', (req, res, next) => {
  db.getAlbumsByID()
  
}

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})