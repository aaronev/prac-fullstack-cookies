const express = require('express')
const bodyParser = require('body-parser')
const data = require('./models/queries.js')
const app = express()

require('ejs')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Helpers

var Users = {
  all: data.getAllInfoFromTable('users'),
  id: (id) => data.getAllInfoByColumnID('users', 'id', id),
  add:(name, email, password, img) => data.addUsers(name, email, password, img)
}

var Albums = {
  all: data.getAllInfoFromTable('albums'),
  id: (id) => data.getAllInfoByColumnID('albums', 'id', id),
}

var Reviews = {
  all: data.getAllInfoFromTable('reviews'),
  id: (id) => data.getAllInfoByColumnID('reviews', 'id', id),
  userID: (id) => data.getAllInfoByColumnID('reviews', 'user_id', id),
  albumID: (id) => data.getAllInfoByColumnID('reviews', 'album_id', id),
  add: data.addReviews()
}

var session = null 

app.get('/', ( req, res, next ) => {
  if (session) {
    session.albums
    .then(albums => {
      console.log(albums)
      session.reviews
      .then(reviews => {
        console.log(reviews)
        res.render('profile', {users: session.users, albums, reviews})
      })
    }).catch(next)
  } else {
    Users.all
    .then(users => {
      Albums.all
      .then(albums => {
        Reviews.all
        .then(reviews => {
          res.render('index', {users, albums, reviews})
        })
      })
    }).catch(next) 
  }
})

app.get('/albums/:id', (req, res, next) => {
  Users.all
  .then(users => {
    Albums.id(req.params.id)
    .then(albums => {
      Reviews.albumID(req.params.id)
      .then(reviews => {
        res.render('albums', {users, albums, reviews})
      })  
    })
  }).catch(next)
})

app.get('/users/:id', (req, res, next) => {
  Users.id(req.params.id)
  .then(users => {
    Albums.all
    .then(albums => {
      Reviews.userID(req.params.id)
      .then(reviews => {
        res.render('user', {users, albums, reviews})
      })  
    })
  }).catch(next)
})

//__________________________________________________________Transition to User Session

app.get('/signin', (req, res, next) => {
  res.render('signin')
})

app.post('/signin', (req, res, next) => {
  const {email, password} = req.body
  console.log(email, password)
  Users.all
  .then(users => {
   const validUser = users.find(user => 
      user.email === email && 
      user.password === password)
    if (validUser) { 
      session = {
        users: validUser,
        albums: Albums.all,
        reviews: Reviews.userID(validUser.id)
      }
      res.redirect('/')
    } else {
      res.redirect('/signin')
    }
  }).catch(next)
})

app.get('/signup', (req, res, next) => {
  res.render('signup')
})

app.post('/signup', (req, res, next) => {
const {name, email, password} = req.body 
const image = '/img-colorful-vinyl.jpg'
  Users.all
  .then(users => {
    console.log(users)
    const invalidEmail = users.find(user =>
    user.email === email)
    if (invalidEmail) { 
      res.redirect('/signup') 
    } else {
      Users.add(name, email, password, image)
      res.redirect('/signin')
    }
  }).catch(next)
})

//_________________________________________________________Session Authenticated Users



//____________________________________________________________loging out of session 

app.get('/signout', (req, res, next) => {
  session = null
  res.redirect('/')
})

app.get('/test', (req, res, next) => {
  Users.all
  .then(users => res.send(users))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})