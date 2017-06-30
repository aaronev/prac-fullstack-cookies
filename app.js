const express = require('express')
const bodyParser = require('body-parser')
const data = require('./models/queries.js')
const cookieParser = require('cookie-parser')
const app = express()

require('ejs')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

//_____________________________________________________________________________________Helpers

var Users = {
  all: data.getAllInfoFromTable('users'),
  id: (id) => data.getAllInfoByColumnID('users', 'id', id),
  add:(nme, eml, pswrd, img) => data.addUsers(nme, eml, pswrd, img)
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
  add: (uID, aID, rev) => data.addReviews(uID, aID, rev),
  delete: (id) => data.deleteReviewByID(id)
}

var session = null 

//__________________________________________________________________________________Unauthorized Users

app.use((req, res, next) => {
  const { users } = req.cookies
  if (users) {
    Users.id(users.id)
    .then(users => {
      req.users = users[0]
    })
  }
  next()
})


app.get('/', ( req, res, next ) => {
  if (session) {
    Albums.all
    .then(albums => {
      Reviews.userID(session.users.id)
      .then(reviews => {
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
        res.render('albums', {session: session, users, albums, reviews})
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

//_________________________________________________________________________Authentication

app.get('/signin', (req, res, next) => {
  res.render('signin')
})

app.post('/signin', (req, res, next) => {
  const {email, password} = req.body
  Users.all
  .then(users => {
   const validUser = users.find(user => 
      user.email === email && 
      user.password === password)
    if (validUser) { 
      session = {
        users: validUser
      },
      res.cookie('users', validUser, {
        expires: new Date(Date.now() + 900000)})
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
    const invalidEmail = users.find(user =>
    user.email === email)
    if (invalidEmail) { 
      res.redirect('/signup') 
    } else {
      Users.add(name, email, password, image)
      .then(() => { res.redirect('/signin')})
    }
  }).catch(next)
})

//___________________________________________________________________________Authorized Users

app.post('/albums/:id', (req, res, next) => {
  const review = req.body.review || null
  if (review) {
    Reviews.add(session.users.id, req.params.id, review)
    .then(() => {res.redirect('/albums/'+req.params.id)})
    .catch(next)
  } else {
    res.redirect('/albums/'+req.params.id)
  }
})

app.post('/reviews/:id', (req, res, next) => {
  Reviews.delete(req.params.id)
  .then(() => { res.redirect('/') })
  .catch(next)
})


//__________________________________________________________________________loging out of session 

app.get('/signout', (req, res, next) => {
  session = null
  res.cookie('users', null, {
    expires: new Date(Date.now())
  })
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