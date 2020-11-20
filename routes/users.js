const express = require('express');
const router = express.Router();

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
       res.send('pass')
   }

})


module.exports = router;
