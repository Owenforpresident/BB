const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public

//post request made to this endpoint, use express validator to make sure they have sent the right information
router.post(
  '/',
  [
   
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 },
      check('admin', 'Account type required')
      .not()
      .isEmpty(),)
  ],
  //if they dont send back a 400 response with the array of errors 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
//otherwise, try to register the user, get the name email and passowrd from the request 
    const { email, password, admin} = req.body;

    try { //db query using mongoose to see if there is already a user with this email address
      let user = await User.findOne({ email });
//if there is, send 400 with message
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
//otherwise creat a new user with the information fromthe request
  
      user = new User({
        email,
        admin,
        password
      });

        //password hashing
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //save this information to the database 
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
