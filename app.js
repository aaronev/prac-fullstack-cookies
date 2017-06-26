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

var userSession;

// session = () => {

// }

itRenders = ( res, auth, users, albums, reviews, signin, signup ) => {
  return ( res.render( 'body', {
    auth: auth,
    users: users,
    albums: albums,
    reviews: reviews,
    signin: signin,
    signup: signup
  }))
}

//Non-Users

app.get( '/', ( req, res, next ) => {
  db.getAllInfo( 'users' )
  .then( users => {
    db.getAllInfo( 'albums' )
    .then( albums => {
      db.getAllInfo( 'reviews' )
      .then( reviews => {
        itRenders( res, null, users, albums, reviews, null, null )
      })
    })
  })
  .catch( next )
})

app.get( '/albums/:id', ( req, res, next ) => {
  const { id } = req.params
  db.getAllInfo( 'users' )
  .then( users => {
    db.getAllInfoByID( 'albums', id )
    .then( albums => {
      db.getReviewsByAlbumID( id )
      .then( reviews => {
        itRenders( res, null, users, albums, reviews, null, null )
      })
    })
  })
  .catch( next )
})

app.get( '/signin', ( req, res, next ) => {
  itRenders( res, null, null, null, null, 'yes', null )
})

app.get( '/signup', ( req, res, next ) => {
  itRenders( res, null, null, null, null, null, 'yes' )
})

app.post( '/email-availabilty', ( req, res, next ) => {
  const { email, password, name } = req.body
})

app.post( '/verify-user', ( req, res, next ) => {
  
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})