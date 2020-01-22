const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')

const db = "mongodb+srv://shubham_123:admin456@cluster0-qf8rm.mongodb.net/test?retryWrites=true&w=majority"
mongoose.Promise = global.Promise
//mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
//  if(err){
//    console.error("Error! " + err)
//  }
//})
// yeah cause local mongoose sever is workokthanksing fine// mongoose.connect(db,{ useNewUrlParser: true });
// yeah, try on your side will hepl you later, okay?thankyou bye
mongoose.connect(db,
  {  dbName: 'crud-user',useNewUrlParser: true,
      useUnifiedTopology: true
  })

// let db2 = mongoose.connection;

// db2.once('open', () => console.log('connected to the database'));

// db2.on('error', console.error.bind(console, 'MongoDB connection error:'));

// router.get('/users', (req, res) => {
//   User.find((err, data) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: data });
//   });
// });

router.get('/users', function(req, res){
  console.log('Get request for all users')
  User.find({})
  .exec(function(err, users){
    if (err){
      console.log("Error retrieving users")
    }else {
      res.json(users)
    }
  })
})

router.get('/users/:id', function(req, res){
  console.log('Get request for a single user')
  User.findById(req.params.id)
  .exec(function(err, user){
    if (err){
      console.log("Error retrieving user")
    }else {
      res.json(user)
    }
  })
})
// waitok
router.post('/user', function(req, res){
  console.log('Post a user')
  var newUser = new User()
  newUser.name = req.body.name
  newUser.title = req.body.title
  newUser.save(function(err, insertedUser){
    if (err){
      console.log('Error saving user')
    }else{
      res.json(insertedUser)
    }
  })
})

router.put('/user/:id', function(req, res){
  console.log('Update a user')
  User.findByIdAndUpdate(req.params.id,
    {
      $set: {name: req.body.name, title: req.body.title}
    },
    {
      new: true
    },
    function(err, updatedUser){
      if(err){
        res.send("Error updating user")
      }else{
        res.json(updatedUser)
      }
    }
    )
})

router.delete('/user/:id', function(req, res){
  console.log('Deleting a user')
  User.findByIdAndRemove(req.params.id, function(err, deletedUser){
    if(err){
      res.send("Error deleting user")
    }else{
      res.json(deletedUser)
    }
  })
})

module.exports = router
