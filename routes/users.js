const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')


//user model 
const User = require('../models/User');
const { request } = require('express');

// Login side
router.get('/login', (req, res) => res.render("login"))

// Registreringsside
router.get('/register', (req, res) => res.render("register"))

//Register handle
router.post('/register', (req, res) => {
   const { firstname, lastname, email, password, password2 } = req.body;
   let errors = [];

   //Check required fields
   if(!firstname || !lastname || !email || !password || !password2){
       errors.push({msg: 'Please fill in all fields'})
   }

  //Check for correct email
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
  } else {
      errors.push({msg: 'Please enter a valid e-mail'})
  }

  
  
   //Check passwords match 
   if(password !== password2){
       errors.push({msg: 'Passwords do not match'})
   }

   //Check password length
   if(password.length < 6){
       errors.push({msg: 'Password should be atleast 6 characters'})
   }

   if(errors.length > 0) {
       res.render('register', {
           errors,
           firstname,
           lastname,
           email,
           password,
           password2
       })
   } else{
       //Validation passed
       User.findOne({email: email})
       .then(user => {
           if(user) {
               //User exists
               errors.push({ msg: "Email is already in use" })
            res.render('register', {
                errors,
                firstname,
                lastname,
                email,
                password,
                password2
            })
           } else {
               const newUser = new User({
                   firstname,
                   lastname,
                   email,
                   password
               })
               //Hash password
               bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    //Set password to hashed
                    newUser.password = hash
                    //Save user
                    newUser.save()
                    .then(console.log(`A user with the name ${newUser.firstname} has been added to the database`))
                    .then(user => {
                        req.flash('success_msg', 'You are now registered and can log in')
                        res.redirect('/users/login')
                    })
                    .catch(err => console.log(err))
               }))

           }
       })

   }

})


module.exports = router;
