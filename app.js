const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models/queries.js')
const app = express()

require('ejs')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Helpers

nonUserRenders = (res, user, albums, reviews, signin, signup) => {
  return (res.render('body', {
    auth: null,
    user: user,
    albums: albums,
    reviews: reviews,
    signin: signin,
    signup: signup
  }))
}

//Non-Users

app.get('/', (req, res, next) => {
  db.getAlbums()
  .then(albums => {
    db.getReviews()
    .then(reviews => {
      nonUserRenders(res, null, albums, reviews, null, null)
    })
  })
  .catch(next)
})

app.get('/albums/:id', (req, res, next) => {
  db.getAlbumsByID(req.params.id)
  .then( albums => {
    db.getReviewsByAlbumID(req.params.id)
    .then( reviews => {
      nonUserRenders(res, null, albums, reviews, null)
    })
  })
  .catch(next)
})

app.get('/signin', (req, res, next) => {
  nonUserRenders(res, null, null, null, 'yes', null)
})

app.get('/signup', (req, res, next) => {
  nonUserRenders(res, null, null, null, null, 'yes')
})


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})